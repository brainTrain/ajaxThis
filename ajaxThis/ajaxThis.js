function ajaxSelect(ajarx){
    //remove escape character so quotes can be used
    return ajarx.split('\\').join('');
}

function ajaxThis(ajaxyz){
            
            var safeSelex = [];
            //set selectLevel equal to object
            var selectLevel = ajaxyz;
            //counter to map DOM
            var j = 0;
            //while loop traces map from object to html, and builds a 
            //selector string that traces the path.
            while(selectLevel.localName != 'html') {
                var attrTree = "";
                var tagTerm = "";
                //grab html tag type to handle custom tags
                tagTerm = selectLevel.localName;
                //grabs all attributes of the object, handles custom attributes 
                if(selectLevel.attributes.length == 0) {
                    //if the object you click on has no attributes, we need to give it
                    //a blank one in order for the click to register
                    var attributeS = '[class=""]';
                } else {
                    var attributeS = "";
                }
                for(i=0; i < selectLevel.attributes.length; i++) {
                    attributeS += '[' + selectLevel.attributes[i].nodeName + '="' + selectLevel.attributes[i].nodeValue + '"]';
                }

                //attribute tree puts tag and attributes together to form a selector 
                //eg a[class="whatevz"][id="thing229"][lolzwhatever="thiswillworkforwhatever"] 
                attrTree += tagTerm + attributeS;

                //build array of selectors leading to the object clicked on 
                safeSelex[j] = attrTree;

                //set select level to parent of current level, to crawl up the DOM
                selectLevel = selectLevel.parentNode;
                j ++;

            }
            
            //grab text of attribute to select on contents as well as attributes of object
            var contains = ajaxyz.textContent;

            //build the safe selector going from body, down to the object.. 
            //and I'm attempting to allow images to be selected.  No luck so far, but the 
            //syntax output is correct
            if(ajaxyz.localName == 'img' || tagTerm != 'body') {
                safeSelex = "'" + safeSelex.reverse().join(' ') + "'"; 
            } else {
                safeSelex = "'" + safeSelex.reverse().join(' ') +  ":contains(" + '"' + contains + '"' + ")'"; 
            }

            return safeSelex;

}
