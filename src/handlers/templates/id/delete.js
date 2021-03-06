import RouteLogger from '../../../routes/route_logger';
import {sendRequestError} from '../../../common/errors/utils';

let logger = new RouteLogger('/templates/:id', 'DELETE');

export default function templateDeleteHandler(request, response) {
  /**
   * @type {ElastalertServer}
   */
  let server = request.app.get('server');
  let path = request.params.id + request.params[0];

  server.templatesController.template(path)
    .then(function (template) {
      template.delete()
        .then(function (template) {
          response.send(template);
          logger.sendSuccessful({
            deleted: true,
            id: request.params.id
          });
        })
        .catch(function (error) {
          logger.sendFailed(error);
          sendRequestError(response, error);
        });
    })
    .catch(function (error) {
      logger.sendFailed(error);
      sendRequestError(response, error);
    });
}
