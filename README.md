# DentistSmile - Jekyll Theme

A single page Jekyll theme for dental clinics. It's easily customizable and responsive. It comes with svg icons, google map and a working contact form. Docs can be found [here](http://obaez.com/dentistsmile-docs/).

Here is a [live Demo](http://obaez.com/dentistsmile/)


## Changing slider images

To select images, open `_config.yml` and change the file name accordingly.
Hero images is should be located inside img folder
hero:
    hero_img_1: hero_0.jpg
    hero_img_2: hero_0.jpg
    hero_img_3: hero_0.jpg


## How to run the site locally :
1. do `git clone repo-url .` , `repo-url` is the one listed on github.
2. do `bundle install` inside the project root (the project root is where your _config.yml and Gemfile located).
3. after it's done, to run the local server : `bundle exec jekyll serve` or `bundle exec jekyll s -w` to serve & watch for changes. `jekyll s` is short form of `jekyll serve`.
4. make some changes to the file (example _posts/2019-02-22-5-tips-for-white-teeth.markdown)
5. do `git add . ` to stage the changes
6. `git commit -m "commit message"` to commit the changes.
7. `git push -u origin master` to push the changes to the repo.
8. wait a minute, and the live-site is updated!

## what is grunt for (as intended by the original theme author) :
1 .minify the svg (not needed in production)
2 concat the js files or bundle all js files into one (not needed in production)
3. grunt serve --> is just an alias of jekyll serve,
but as we use bundler to do bundle install, the correct way to start local server is to do
bundle exec jekyll s -w.

So there's no need for grunt in production, that's why package.json can be safely removed.

It is also OK to keep it (the downsite is you'll get an annoying security alert, which in our case HAS NO EFFECT ON THE SITE SECURITY).
