import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { CATEGORY, TAG, SINGLE } from '../../actions';
import Link from 'redux-first-router-link';

const PostCard = ({post}) => {
  return(
    <Card>
      <Image src={post.featured_image_url.medium} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          <Link 
            to={{ type: SINGLE, payload: { slug: post.slug } }}
            dangerouslySetInnerHTML={{__html: post.title.rendered}} 
          ></Link>
        </Card.Header>
        <Card.Meta>
          {renderCategories(post.categories)}
          <span className='date'>{renderDates(post.date, post.formatted_date)}</span>
        </Card.Meta>
        <Card.Description dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}>
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{wordWrap:'anywhere'}}>
        {renderTags(post.tags)}
      </Card.Content>
    </Card>
  )
}

function renderCategories(categories) {
  if ('undefined' !== typeof categories) {
    return categories.map((cat, i) => {
      if (1 == categories.length || cat.slug !== 'uncategorized') {
        return (<span key={cat.id}>
          <Link
            to={{
              type: CATEGORY,
              payload:
              {
                taxId: cat.id,
                slug: cat.name
              }
            }} className="cat-links">{cat.name}</Link>
          {(1 < categories.length && i < (categories.length - 1)) ? ', ' : ''}
        </span>);
      }
    });
  }
}

function renderTags(tags) {
  return tags.map((tag) => {
    return (
      <span key={tag.id} style={{ marginRight: '5px' }}>
        <Link to={{
          type: TAG,
          // Viene visualizzato lo slug nell'url
          payload: {               // ma utilizzato il taxId per richiedere
            slug: tag.slug,        // i posts
            taxId: tag.id,
            name: tag.name
          }
        }}>{tag.name}</Link>
      </span>
    )
  })
}

function renderDates(date, formattedDate) {
  return (<span> | <time dateTime={date.substring(0, 10)}>{formattedDate}</time></span>);
}

export default PostCard;