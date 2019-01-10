export default {
  filters: {
    nodesToStr(nodes, placeholder) {
      if(!nodes || !nodes.length)return placeholder
      return nodes.map(v => v.label).join('，')
    }
  }
}
