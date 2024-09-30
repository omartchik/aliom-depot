# echo 'Switching to branch master'
# git checkout master
echo 'Building the project'
# sudo npm run build
echo "deploying to server"
scp -r ./* root@185.166.39.33:/home/omar/aliom/aliom-depot

echo 'Done'