const application = new Application(document.getElementById("imageProcessing"),
                                        700,700,20,20);
application.addComponent(Sketch);
application.run()