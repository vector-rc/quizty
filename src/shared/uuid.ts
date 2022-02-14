const uuid = () => {
  let uuid = (Date.now().toString(36) + (Math.random() * 10000000).toString(36))
  uuid = uuid.replace('.', '')
  // uuid=uuid.slice(-14)
  return uuid
}

export default uuid
