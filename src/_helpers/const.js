const RENT = "RENT";
const CATERING = "CATERING";
const HALL = "HALL";
const paypal = {
  sandBoxEnv: "sandbox",
  prodEnv: "production", // you can set here to 'production' for production
  currency: "USD", // or you can set this value from your props or state
  client: {
    sandbox:
      "AcTjgh9xmz-3HYSvvGA3UEyAhhaz2p5t_5mMb9Uj05s4ZMjHXWjN5MvCNhGwj2Llvfi4fHKCSZKKo4Mc",
    production:
      "AR-uw6Ali0Eny1ZfYNb9ijDt_ZY0GGBiUinzPUiR555Gjpc6wV0-b5JE5Yjc9BJClzlc1OtktXd6mMum"
  }
};
module.exports  = {
    types: {
        RENT,
        CATERING,
        HALL,
    },
    Paypal: paypal
};
