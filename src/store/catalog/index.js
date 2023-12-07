import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: []
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles?limit=100&skip=0');
    const json = await response.json();

    const responseCount = await fetch("/api/v1/articles?fields=count");
    const jsonCount = await responseCount.json();
    const totalItems = jsonCount.result.count;

    this.setState({
      ...this.getState(),
      list: json.result.items
    });
    this.store.actions.navigation.setTotalItems(totalItems);
  }
}

export default Catalog;
