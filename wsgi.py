import os
import traceback

from twisted.web.wsgi import WSGIResource
from twisted.internet import reactor
from twisted.web import server

from app import app

resource = WSGIResource(reactor, reactor.getThreadPool(), app)
site = server.Site(resource)

reactor.listenTCP(3000, site)

try:
  reactor.run()
except Exception as e:
  traceback.print_exc()