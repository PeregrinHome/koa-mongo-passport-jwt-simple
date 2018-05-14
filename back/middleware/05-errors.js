
exports.init = app => app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
      console.log('GLOBAL ERROR');
      console.log(e);
      if (e.name === 'ValidationError') {
          let errorMessages = {};
          for(let key in e.errors) {
              errorMessages[key] = e.errors[key].message;
          }
          ctx.status = 401;
          return ctx.body = { errorMessages: errorMessages};
      }else if(!e.errors && e.name !== 'ValidationError'){
          if (e.status) {
              ctx.body = e.message;
              ctx.status = e.status;
          } else {
              ctx.body = 'Error 500';
              ctx.status = 500;
              console.error(e.message, e.stack);
          }
      }

  }
});
