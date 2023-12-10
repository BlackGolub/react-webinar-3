import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
    };
  }

  async load(number) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(number - 1) * 10}`);
    const json = await response.json();

    const responseCount = await fetch("/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count");
    const jsonCount = await responseCount.json();

    const totalCount = Math.ceil(jsonCount.result.count / 10);
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: totalCount,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
