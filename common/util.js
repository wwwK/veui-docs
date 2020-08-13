export function walk (list, base, callback) {
  if (!Array.isArray(list)) {
    return
  }

  let stopped = list.some(item => {
    let newBase = `${base}/${item.slug}`
    if (typeof callback === 'function') {
      if (callback(item, newBase) === false) {
        return true
      }
    }
    if (item.children) {
      if (walk(item.children, newBase, callback) === false) {
        return true
      }
    }
    return false
  })
  return !stopped
}

export function getLink ({ slug, link, children }) {
  if (link === false) {
    let actual = null
    walk(children, slug, (item, base) => {
      // leaf
      if (!item.children || !item.children.length) {
        actual = base
        return false
      }
    })
    if (actual !== null) {
      return `/${actual}`
    }
  }
  return `/${slug}`
}
