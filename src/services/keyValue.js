export async function get (name) {
  return JSON.parse(localStorage.getItem(name))
}

export async function set (name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export async function remove (name) {
  localStorage.removeItem(name)
}
