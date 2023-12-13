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
      const json = await response.json();
      console.log('Ответ сервера:', json);

      const categories = json.result.items.map(item => ({
        title: item.title,
        value: item._id,
        parent: item.parent?._id || null
      }));

      console.log('Преобразованные категории:', categories);

      const menu = this.buildMenu(categories);
      console.log('Построенное меню:', menu);

      const structuredMenu = this.structureMenu(menu);
      console.log('Структурированное меню:', structuredMenu);

      this.setState({
        ...this.getState(),
        category: [{ title: 'Все', value: '' }, ...structuredMenu]
      });
    } catch (err) {
      console.error(err);
    }
  }

  buildMenu(data) {
    const menu = [];
    const nodes = {};

    data.forEach(item => {
      const prefix = item.parent ? item.parent.slice(21) === '339' ? '-- ' : '- ' : '';
      const node = this.createNode(item, nodes, prefix);

      if (!item.parent) {
        menu.push(node);
      }
    });

    return menu;
  }

  createNode(item, nodes, prefix) {
    const node = {
      title: `${prefix}${item.title}`,
      value: item.value,
      children: []
    };

    nodes[item.value] = node;

    if (item.parent) {
      nodes[item.parent].children.push(node);
    }

    return node;
  }

  structureMenu(menu) {
    let structuredMenu = [];

    menu.forEach(item => {
      structuredMenu.push(item);
      if (item.children.length > 0) {
        structuredMenu = [...structuredMenu, ...this.structureMenu(item.children)];
      }
    });

    return structuredMenu;
  }
}

export default CategoriesState;
