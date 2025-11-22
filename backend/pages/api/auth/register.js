import { supabase } from '../../../utils/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nickname, password } = req.body;

  if (!nickname || !password) {
    return res.status(400).json({ error: 'Nickname and password are required' });
  }

  const {  existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('nickname', nickname)
    .single();

  if (existingUser) {
    return res.status(400).json({ error: 'Nickname already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ nickname, password: hashedPassword }])
    .select('id, nickname')
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  await supabase.from('wallets').insert([{ user_id: data.id, balance: 0 }]);

  const token = jwt.sign({ id: data.id, nickname: data.nickname }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({ user: data, token });
}
