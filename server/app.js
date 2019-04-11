import Koa from 'koa';
import path from 'path';
import Router from 'koa-router';
import Bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import serve from 'koa-static';
import historyApiFallback from 'koa2-history-api-fallback';
import chat from './routes/chat';

const port = 8080;

const app = new Koa();
const router = Router(); 

app.use( Bodyparser() );
app.use( json() );

app.use( async ( ctx, next ) => {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log( '%s %s - %s', ctx.method, ctx.url, ms );
} )

app.use( async ( ctx, next ) => {  //  如果JWT验证失败，返回验证失败信息
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

app.on( 'error', ( err, ctx ) => {
  console.log( 'server error', err );
} )

router.use( '/chat', chat.routes() );

app.use( router.routes() );
app.use( historyApiFallback() );
app.use( serve( path.resolve( 'dist' ) ) );

app.listen( port, () => {
  console.log( `Koa is listening in ${ port }` );
} )