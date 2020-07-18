process.on('unhandledRejection', (reason) => {
    console.log({ err: reason }, 'Unhandled Rejection');
    process.exit(1);
  });
  
  process.on('uncaughtException', (error) => {
    console.log({ err: error }, 'Unhandled Exception');
    process.exit(1);
  });
  
  process.on('warning', (error) => {
    console.log(error, 'Warning detected');
  });
  
  process.on('exit', (code) => {
    console.log(`Stopped with code: ${code}`);
  });