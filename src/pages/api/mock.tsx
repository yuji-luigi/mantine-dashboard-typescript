function handler(req: any, res: any) {
  const { email, password } = req.body;
  if (email === 'admin@demo.com' && password === 'user$$$') {
    return res.status(200).json({
      name: 'admin user',
      role: 'super_admin',
    });
  }
  return res.status(200).json({ message: 'hey' });
}
export default handler;
