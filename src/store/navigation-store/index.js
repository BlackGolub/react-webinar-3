import StoreModule from "../module";

class NavigationStore extends StoreModule {
  initState() {
    return {
      totalPages: 0,
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
    }
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    });
  }

  setTotalItems(totalItems) {
    this.setState({
      ...this.getState(),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / this.getState().pageSize)
    });
  }

  setTotalPages(total) {
    this.setState({
      ...this.getState(),
      totalPages: total
    }, 'Установлено общее количество страниц');
    console.log('setTotalPages')
  }

  calculatePages() {
    const { totalItems, pageSize } = this.getState();
    const totalPages = Math.ceil(totalItems / pageSize);

    this.setState({
      ...this.getState(),
      totalPages
    });
    console.log('calculatePages')
  }
}

export default NavigationStore;