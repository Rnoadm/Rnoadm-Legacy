goog.provide('rnoadm.main');

goog.require('goog.debug.FancyWindow');
goog.require('goog.log');
goog.require('rnoadm.hud');
goog.require('rnoadm.hud.cc');
goog.require('rnoadm.hud.examine');
goog.require('rnoadm.hud.forge');
goog.require('rnoadm.hud.inv');
goog.require('rnoadm.hud.menu');
goog.require('rnoadm.hud.menu2');
goog.require('rnoadm.login');
goog.require('rnoadm.net');
goog.require('rnoadm.state');


if (goog.DEBUG) {
  new goog.debug.FancyWindow();
}

rnoadm.hud.register('cc', rnoadm.hud.cc);
rnoadm.hud.register('examine', rnoadm.hud.examine);
rnoadm.hud.register('forge', rnoadm.hud.forge);
rnoadm.hud.register('inv', rnoadm.hud.inv);
rnoadm.hud.register('menu', rnoadm.hud.menu);
rnoadm.hud.register('menu2', rnoadm.hud.menu2);


/**
 * Logger for rnoadm.main
 *
 * @type {goog.debug.Logger}
 * @private
 * @const
 */
rnoadm.main.logger_ = goog.log.getLogger('rnoadm.main');


/**
 * The hash of the compiled client code, as sent by the server.
 *
 * @type {string|undefined}
 * @private
 */
rnoadm.main.clientHash_;


rnoadm.net.addHandler('ClientHash', function(hash) {
  goog.log.info(rnoadm.main.logger_, 'Client hash: ' + hash);
  if (goog.isDef(rnoadm.main.clientHash_)) {
    if (rnoadm.main.clientHash_ != hash) {
      location.reload(true);
    }
  } else {
    rnoadm.main.clientHash_ = hash;
  }
});


// vim: set tabstop=2 shiftwidth=2 expandtab:
