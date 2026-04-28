import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'subscribers.json');

export interface Subscriber {
  email: string;
  status: 'pending' | 'subscribed';
  token: string;
  source: string;
  subscribedAt: string;
}

async function ensureDbExists() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([]));
  }
}

async function getSubscribers(): Promise<Subscriber[]> {
  await ensureDbExists();
  const data = await fs.readFile(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

async function saveSubscribers(subscribers: Subscriber[]) {
  await ensureDbExists();
  await fs.writeFile(DB_FILE, JSON.stringify(subscribers, null, 2));
}

export async function getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
  const subscribers = await getSubscribers();
  return subscribers.find(s => s.email === email);
}

export async function getSubscriberByToken(token: string): Promise<Subscriber | undefined> {
  const subscribers = await getSubscribers();
  return subscribers.find(s => s.token === token);
}

export async function addPendingSubscriber(email: string, source: string): Promise<string> {
  const subscribers = await getSubscribers();
  const token = crypto.randomBytes(32).toString('hex');
  
  const newSubscriber: Subscriber = {
    email,
    status: 'pending',
    token,
    source,
    subscribedAt: new Date().toISOString()
  };

  subscribers.push(newSubscriber);
  await saveSubscribers(subscribers);
  return token;
}

export async function confirmSubscriber(token: string): Promise<Subscriber | null> {
  const subscribers = await getSubscribers();
  const index = subscribers.findIndex(s => s.token === token);
  
  if (index === -1) return null;
  if (subscribers[index].status === 'subscribed') return subscribers[index]; // Already confirmed

  subscribers[index].status = 'subscribed';
  await saveSubscribers(subscribers);
  
  return subscribers[index];
}

export async function updateSubscriberToken(email: string): Promise<string> {
  const subscribers = await getSubscribers();
  const index = subscribers.findIndex(s => s.email === email);
  
  if (index !== -1) {
    const token = crypto.randomBytes(32).toString('hex');
    subscribers[index].token = token;
    await saveSubscribers(subscribers);
    return token;
  }
  return crypto.randomBytes(32).toString('hex');
}
