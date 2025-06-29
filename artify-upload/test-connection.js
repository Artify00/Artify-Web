const net = require('net');

console.log('Testing Supabase connection...');

const client = new net.Socket();
client.setTimeout(5000);

client.connect(5432, 'db.vxqorzoradsvelojelfs.supabase.co', () => {
  console.log('✅ TCP connection successful');
  client.destroy();
});

client.on('error', (err) => {
  console.log('❌ Connection failed:', err.message);
  console.log('Error code:', err.code);
});

client.on('timeout', () => {
  console.log('❌ Connection timeout');
  client.destroy();
});