# Veggie Rescue 🥕
## A donation tracking platform for [Veggie Rescue](https://www.veggierescue.org/)
Veggie Rescue collects fresh fruits, vegetables and prepared food from local farms, farmers markets, backyards and businesses, then delivers this food directly to nonprofit recipient organizations and schools feeding community members in need. By creating a digital system that allows drivers to log donation information on pickups, the movement of food can be more easily tracked, allowing Veggie Rescue to effeciently administer their resources. Additionally, our platform handles driver availability and allows for easy report generation for both donations and driver activities. More information on the CalPoly Hack4impact team can be found [here] (https://calpoly.hack4impact.org/projects/veggie-rescue).

## 🍅 Getting started: For developers 
### Clone the repository
```
git clone https://github.com/hack4impact-calpoly/veggie-rescue.git
```

### Running frontend 
1. Make sure you're in the _frontend_ directory using `cd frontend`
2. Make sure all packages are up to date with `npm i`
3. `npm start`

### Running backend
1. Make sure you're in the _backend_ directory using `cd backend`
2. Make sure all packages are up to date with `npm i`
3. `npm 

### Making Changes
1. Before you make changes to the code, run `git pull`
2. Create a branch with `git checkout -b <branch-name>
3. ***/~code/~***
4. Stashing changes to commit: 
``` 
git add * // add all changes
git add . // add all changes in current directory (_recursively_)
git add <file-name> // add specified <file-name>
```
5. Commit changes:
```
git commit -m "<short-description-of-what-you-did>
```
_Ps. Could be helpful to check what you're going to commit with `git status`_
6. Push branch to repository:
```
git push origin <branch-name>
// if it's the first time you're pushing a branch, you need to add -u after 'git push'!
```
7. Make a pull request (PR) to merge into main, request a reviewer to check your code and wait for your code to be approved! :)
