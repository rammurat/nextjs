import nextConnect from 'next-connect';
import {middleware} from '../../../middleware/database';
import {findDocument,findDocuments} from '../../../utils/db-utils'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const {
    query: { slug },
  } = req

  try{
    // find sub category id to fetch the products
    var regex = new RegExp(["^", slug[0], "$"].join(""), "i");
    const query = {name: regex}
    const collection = await req.db.collection('sub-categories')
    const result = await findDocument(collection, query)

    // find products that belongs to the search sub categories
    if(result && result.id) {
      const _query = {id: parseInt(slug[1]), sub_cat_id: result.id}
      const _collection = await req.db.collection('products')
      const prodResult = await findDocument(_collection, _query)

      if(prodResult) {
        res.json(prodResult)
      }
    }

    res.json({message:'No products found'});
  } catch(error) {
    console.log(error)
      res.json({message:'No products found'});
  }

});


export default handler;