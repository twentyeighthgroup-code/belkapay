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

  const {  user, error } = await supabase
    .from('users')
    .select('id, nickname, password')
    .eq('nickname', nickname)
    .single();

  if (error || !user) {
    return res.status(400).json({ error: 'Invalid nickname or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid nickname or password' });
  }

  const token = jwt.sign({ id: user.id, nickname: user.nickname }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({ user: { id: user.id, nickname: user.nickname }, token });
}
