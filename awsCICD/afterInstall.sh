sudo rm -rf /var/www/rowilab/.htaccess
# ONLY FOR apache servers
# sudo printf '%s\n%s\n%s\n%s\n' 'Options -MultiViews' 'RewriteEngine On' 'RewriteCond %{REQUEST_FILENAME} !-f' 'RewriteRule ^ index.html [QSA,L]'  'RewriteEngine On'  'RewriteCond %{HTTPS} off' 'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]'  >> /var/www/rowilab/.htaccess
# sudo printf '%s\n%s\n%s\n%s\n' 'Options -MultiViews' 'RewriteEngine On' 'RewriteCond %{REQUEST_FILENAME} !-f' 'RewriteRule ^ index.html [QSA,L]'  'RewriteEngine On'  'RewriteCond %{HTTPS} off' 'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]'  >> /var/www/rowilabViewer/.htaccess
sudo chown -R ubuntu:ubuntu /var/www/rowilab
sudo chown -R ubuntu:ubuntu /var/www/rowilabViewer
# cd /var/www/rowilab/server && npm install
sudo systemctl restart nginx
pm2 delete all
pm2 stop all
pm2 start /var/www/rowilab/server/dist/index.js --name "server"
