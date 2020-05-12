import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import {CATEGORY} from '../../../pages';

export default class Meta extends Component {
  renderCategories() {
    if ('undefined' !== typeof this.props.categories) {
      return this.props.categories.map((cat, i) => {
        if (1 == this.props.categories.length || cat.slug !== 'uncategorized') {
          return (<span key={cat.id}>
            <Link
              to={{
                type:CATEGORY,
                payload:
                  {
                    taxId: cat.id,
                    tax:'categories',
                    slug:cat.name
                  }
                }} className="cat-links">{cat.name}</Link>
            {(1 < this.props.categories.length && i < (this.props.categories.length - 1)) ? ', ' : ''}
          </span>);
        }
      });
    }
  }

  renderDates() {
    if ('post' === this.props.type && this.props.isSingle) {
      return <span> | <time dateTime={this.props.date.substring(0, 10)}>{this.props.formattedDate}</time></span>;
    }
  }

  render() {
    return (<div className="meta">
      <div className="cats">{this.renderCategories()}{this.renderDates()}</div>
    </div>);
  }
}