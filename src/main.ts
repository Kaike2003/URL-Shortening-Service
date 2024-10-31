import ApiExpress from "./api/express/express";
import ShortURLController from "./controller/shortURL/shortURL.controller";

function main() {
  const server = ApiExpress.build();
  const urlController = ShortURLController.build();

  server.postAdd("/shorten", urlController.create);
  server.deleteAdd("/shorten/:shortCode", urlController.delete);
  server.getAdd("/shorten", urlController.findAll);
  server.getAdd("/shorten/:shortCode/stats", urlController.findOneStatistics);
  server.putAdd("/shorten/:shortCode", urlController.updateOne);

  server.getRotes();
  server.server(8888);
}

main();
