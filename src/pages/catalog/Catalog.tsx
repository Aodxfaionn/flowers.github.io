import "./style.css";
import { catalog } from "shared/model/arr";
import { item } from "shared/model/types";
import { Card } from "shared/ui";
import { Button } from "shared/ui";
import { Breadcrumbs } from "shared/ui";
import { SidePanel } from "widgets/sidePanelCatalog/SidePanel";
import { useFiltr } from "shared/lib/useFiltr";
import { useBtnMore } from "shared/lib/useBtnMore";
import { useCart } from "shared/lib/useCart";

export function Catalog() {
  const [
    handleSortChange,
    handleCategoryChange,
    handlePriceRangeChange,
    resetFilters,
    filteredList,
  ] = useFiltr(catalog);
  const [sliceArr, loadMore] = useBtnMore(filteredList, 15);

  const { addItemToCart } = useCart();
  const handleAddToCart = (product: item) => {
    addItemToCart({ id: product.id, title: product.title, price: product.price, img: product.img });
  };

  const arrPaths = [{ namePage: "Каталог букетов" }];

  return (
    <div className="catalog">
      <div className="container">
        <Breadcrumbs arr={arrPaths} />
        <h1 className="inner__title-one">Каталог букетов</h1>
        <div className="catalogContainer">
          <SidePanel
            handleSortChange={handleSortChange}
            handleCategoryChange={handleCategoryChange}
            handlePriceRangeChange={handlePriceRangeChange}
            resetFilters={resetFilters}
          />
          <div>
            <div className="catalogList">
              {sliceArr.map((item: item, num: number) => (
                <Card
                  id={num}
                  key={num}
                  styles="card"
                  image={item.img}
                  title={item.title}
                >
                  {item.mark == "new" && <div className="mark new">New</div>}
                  {item.mark == "sale" && <div className="mark sale">sale</div>}
                  {item.mark == "hit" && <div className="mark hit">hit</div>}
                  <p>{item.price} ₽</p>
                  <Button style="btn-opacity" text="В корзину" onClick={() => handleAddToCart(item)} />
                </Card>
              ))}
            </div>
            {filteredList.length > sliceArr.length && (
              <Button
                text="Показать еще"
                style="btn"
                onClick={() => loadMore()}
              />
            )}
          </div>
        </div>
      </div>
      <Button text="" style="btn-circle" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
      <img
        src={require("../../assets/images/bg-img/catalog-redFlower-left.png")}
        className="catalog__flower catalog__flower-one"
      />
      <img
        src={require("../../assets/images/bg-img/catalog-redFlower-right.png")}
        className="catalog__flower catalog__flower-two"
      />
      <div className="catalog__green-one green blur"></div>
      <div className="catalog__green-two green blur"></div>
      <div className="catalog__green-three green blur"></div>
      <div className="catalog__pink-one pink blur"></div>
      <div className="catalog__pink-two pink blur"></div>
      <div className="catalog__pink-three pink blur"></div>
      <div className="catalog__pink-four pink blur"></div>
    </div>
  );
}
