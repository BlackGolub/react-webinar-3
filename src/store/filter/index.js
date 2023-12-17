import StoreModule from "../module";

class CategoriesState extends StoreModule {
  initState() {
    return {
      category: []
    };
  }

  async getCategories() {
    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const res = await response.json();
      const result = res.result.items.map(item => ({
        title: item.title,
        value: item._id,
        parent: item.parent?._id || null
      }));

      const menu = this.sortList(result);
      this.setState({
        ...this.getState(),
        category: [{ title: 'Все', value: '' }, ...menu]
      });
    } catch (err) {
      console.error('Ошибка при получении категорий:', err);
    }
  }

  sortList(items) {
    const parentChildMap = {};

    items.forEach(item => {
      const parent = item.parent || null;
      if (!parentChildMap[parent]) {
        parentChildMap[parent] = [];
      }
      parentChildMap[parent].push(item);
    });

    return this.sortItems(null, parentChildMap);
  }

  sortItems(parent, parentChildMap, depth = 0) {
    const children = parentChildMap[parent] || [];
    let result = [];
    children.forEach(child => {
      child.title = '- '.repeat(depth) + child.title;
      result.push(child);
      result = [...result, ...this.sortItems(child.value, parentChildMap, depth + 1)];
    });
    return result;
  }
}

export default CategoriesState;
