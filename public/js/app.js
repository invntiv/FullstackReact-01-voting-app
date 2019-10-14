class ProductList extends React.Component {
  // NEVER modify state outside of this.setState()
  // Always initialze state as an empty object
  state = {
    products: []
  };

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  /* 
   First we use map() to traverse the products array 
   because map() returns a NEW array as opposed to modifying this.state.products

   Next we check if the current product matches the productId.
    If it does, we create a new object, copying over properties from original object.
    We then overwrite the votes property on our new object. We set it to incremented vote count 
    using Object.assign().

    If it does not, we return it unmodified -- " return product; "
 
    Finally, we use setState() to update the state
  */
  handleProductUpVote = productId => {
    console.log(productId + " was upvoted.");

    const nextProducts = this.state.products.map(product => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1
        });
      } else {
        return product;
      }
    });

    this.setState({
      products: nextProducts
    });
  };

  handleProductDownVote = productId => {
    console.log(productId + " was downvoted.");

    const nextProducts = this.state.products.map(product => {
      if (product.id === productId && product.votes > 0) {
        return Object.assign({}, product, {
          votes: product.votes - 1
        });
      } else {
        return product;
      }
    });

    this.setState({
      products: nextProducts
    });
  };

  render() {
    // const products = Seed.products.sort((a, b) => b.votes - a.votes);
    const products = this.state.products.sort((a, b) => b.votes - a.votes);

    const productComponents = products.map(product => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onUpVote={this.handleProductUpVote}
        onDownVote={this.handleProductDownVote}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  // Inside `Product`
  handleUpVote = () => {
    this.props.onUpVote(this.props.id);
  };

  handleDownVote = () => {
    this.props.onDownVote(this.props.id);
  };

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        {/* Inside `render` for Product` */}
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            <a onClick={this.handleDownVote}>
              <i className="large caret down icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
