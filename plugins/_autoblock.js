let handler = m => m

handler.before = async function (m) {
   if (m.sender.startsWith('234' || '234')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('212' || '212')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('50' || '50')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('55' || '55')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('51' || '51')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('20' || '20')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('1' || '1')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('7' || '7')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('91' || '91')) {
   	global.db.data.users[m.sender].banned = true
   	await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('92' || '92')) {
   	global.db.data.users[m.sender].banned = true
   	await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('93' || '93')) {
   	global.db.data.users[m.sender].banned = true
    await conn.updateBlockStatus(m.sender, "block")
   }
   
   if (m.sender.startsWith('90' || '90')) {
   	global.db.data.users[m.sender].banned = true
   	await conn.updateBlockStatus(m.sender, "block")
   }
   }
export default handler
