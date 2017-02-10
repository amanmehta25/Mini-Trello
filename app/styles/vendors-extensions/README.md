# Vendors Extensions

If you have to override a section of any vendor, it is better to put them in a `vendors-extensions/` folder in which you may have files named exactly after the vendors they overwrite. For instance, `vendors-extensions/_bootstrap.scss` is a file containing all CSS rules intended to re-declare some of Bootstrap’s default CSS. This is to avoid editing the vendor files themselves, which is generally not a good idea.

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture) > [Vendors Extensions folder](http://sass-guidelin.es/#vendors-extensions-folder)
