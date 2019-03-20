import Koa from 'koa';
import Router from 'koa-router';
import Bodyparser from 'koa-bodyparser';
import json from 'koa-json';

const app = new Koa();
const router = Router(); 

app.use( koaBodyparser() );
app.use( json() );

app.use( async function ( ctx, next ) {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log( '%s %s - %s', ctx.method, ctx.url, ms );
} )

app.use( async function ( ctx, next ) {  //  如果JWT验证失败，返回验证失败信息
  try {
    await next();
  } catch ( err ) {
    if ( err.status === 401 ) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
} )

app.on( 'error', function ( err, ctx ) {
  console.log( 'server error', err );
} )