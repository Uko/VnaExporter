
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.allButLast = function(suffixLength) {
    return this.substring(0, this.length-suffixLength)
};

function createSourceLinks() {
	// on each method source 
    $(".method_details").each(function(){
		$(this).find(".signature")
			.append("<span class='showSource'><a href='#' class='toggleSource'>&oplus;</a><span>");
		$(this).find(".source_code").css("display", "none");
	});
	// on the method detail sections
	
    $(".methodDetail").each(function(){
		$(this).find("h2.title")
			.append("<span class='showSource'><a href='#' class='toggleSource'>&oplus;</a><span>");
	});
	// trigger the slide up/ slide down
    $('.toggleSource').parent().parent().toggle(
		function() {
	       	$(this).find('.toggleSource').html("&otimes;");
			$(this).parent().find(".source_code").slideDown(100);
	    },
	    function() {
	        	$(this).find('.toggleSource').html("&oplus;");
			$(this).parent().find(".source_code").slideUp(100);
	    });
}

function createInheritedMethodLinks() {
	// on each method link group
	$(".inheritedMethod").each(function(){
		if($(this).find(".inheritedMethodList").css("display") == "none") {
			$(this).find("h3.inherited")
				.prepend("<span class='showSource'><a href='#' class='toggleMethods'>&#x25b6;</a><span>");
		}
	});
	
	// on each method link section (instance and class side)
	$(".methodSummary").each(function(){
		$(this).find("h2.title")
			.prepend("<span class='showSource'><a href='#' class='toggleMethods'>&#x25b6;</a><span>");
	});
	// triger the slideup / slide down
    $('.toggleMethods').parent().toggle(function() {
	       $(this).parent().parent().find(".inheritedMethodList").slideDown(100);
	       $(this).find('.toggleMethods').html("&#x25bc;");
	    },
	    function() {
	        $(this).parent().parent().find(".inheritedMethodList").slideUp(100);
	        $(this).find('.toggleMethods').html("&#x25b6;");
	 });
	
}

function createDefineLinks() {
    var tHeight = 0;
    $('.defines').after(" <a href='#' class='toggleDefines'>more...</a>");
    $('.toggleDefines').toggle(function() {
        tHeight = $(this).parent().prev().height();
        $(this).prev().show();
        $(this).parent().prev().height($(this).parent().height());
        $(this).text("(less)");
    },
    function() {
        $(this).prev().hide();
        $(this).parent().prev().height(tHeight);
        $(this).text("more...")
    });
}

function createFullTreeLinks() {
    var tHeight = 0;
    $('.inheritanceTree').toggle(function() {
        tHeight = $(this).parent().prev().height();
        $(this).parent().toggleClass('showAll');
        $(this).text("(hide)");
        $(this).parent().prev().height($(this).parent().height());
    },
    function() {
        $(this).parent().toggleClass('showAll');
        $(this).parent().prev().height(tHeight);
        $(this).text("show all")
    });
}

function fixBoxInfoHeights() {
    $('dl.box dd.r1, dl.box dd.r2').each(function() {
       $(this).prev().height($(this).height()); 
    });
}

function searchFrameLinks() {
  $('#method_list_link').click(function() {
    toggleSearchFrame(this, relpath + 'method_list.html');
  });

  $('#class_list_link').click(function() {
    toggleSearchFrame(this, relpath + 'class_list.html');
  });

  $('#file_list_link').click(function() {
    toggleSearchFrame(this, relpath + 'file_list.html');
  });
}

function toggleSearchFrame(id, link) {
  var frame = $('#search_frame');
  $('#search a').removeClass('active').addClass('inactive');
  if (frame.attr('src') == link && frame.css('display') != "none") {
    frame.slideUp(100);
    $('#search a').removeClass('active inactive');
  }
  else {
    $(id).addClass('active').removeClass('inactive');
    frame.attr('src', link).slideDown(100);
  }
}

function linkSummaries() {
  $('.summary_signature').click(function() {
    document.location = $(this).find('a').attr('href');
  });
}

function framesInit() {
  if (window.top.frames.main) {
    document.body.className = 'frames';
    $('#menu .noframes a').attr('href', document.location);
    $('html head title', window.parent.document).text($('html head title').text());
  }
}

function keyboardShortcuts() {
  if (window.top.frames.main) return;
  $(document).keypress(function(evt) {
    if (evt.altKey || evt.ctrlKey || evt.metaKey || evt.shiftKey) return;
    if (typeof evt.orignalTarget !== "undefined" &&  
        (evt.originalTarget.nodeName == "INPUT" || 
        evt.originalTarget.nodeName == "TEXTAREA")) return;
    switch (evt.charCode) {
      case 67: case 99:  $('#class_list_link').click(); break;  // 'c'
      case 77: case 109: $('#method_list_link').click(); break; // 'm'
      case 70: case 102: $('#file_list_link').click(); break;   // 'f'
    }
  });
}

function summaryToggle() {
  $('.summary_toggle').click(function() {
    localStorage.summaryCollapsed = $(this).text();
    $(this).text($(this).text() == "collapse" ? "expand" : "collapse");
    var next = $(this).parent().parent().next();
    if (next.hasClass('compact')) {
      next.toggle();
      next.next().toggle();
    } else if (next.hasClass('summary')) {
      var list = $('<ul class="summary compact" />');
      list.html(next.html());
      list.find('.summary_desc, .note').remove();
      list.find('a').each(function() {
        $(this).html($(this).find('strong').html());
        $(this).parent().html($(this)[0].outerHTML);
      });
      next.before(list);
      next.toggle();
    }
    return false;
  });
  if (localStorage) {
    if (localStorage.summaryCollapsed == "collapse") $('.summary_toggle').click();
    else localStorage.summaryCollapsed = "expand";
  }
}

function fixOutsideWorldLinks() {
  $('a').each(function() {
    if (window.location.host != this.host) this.target = '_parent';
  });
}

function generateTOC() {
  if ($('#filecontents').length == 0) return;
  var _toc = $('<ol class="top"></ol>');
  var show = false;
  var toc = _toc;
  var counter = 0;
  var tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  if ($('#filecontents h1').length > 1) tags.unshift('h1');
  for (i in tags) { tags[i] = '#filecontents ' + tags[i] }
  var lastTag = parseInt(tags[0][1]);
  $(tags.join(', ')).each(function() {
    if (this.id == "filecontents") return;
    show = true;
    var thisTag = parseInt(this.tagName[1]);
    if (this.id.length == 0) {
      var proposedId = $(this).text().replace(/[^a-z0-9-]/ig, '_');
      if ($('#' + proposedId).length > 0) proposedId += counter++;
      this.id = proposedId;
    }
    if (thisTag > lastTag) { 
      for (var i = 0; i < thisTag - lastTag; i++) { 
        var tmp = $('<ol/>'); toc.append(tmp); toc = tmp; 
      } 
    }
    if (thisTag < lastTag) { 
      for (var i = 0; i < lastTag - thisTag; i++) toc = toc.parent(); 
    }
    toc.append('<li><a href="#' + this.id + '">' + $(this).text() + '</a></li>');
    lastTag = thisTag;
  });
  if (!show) return;
  html = '<div id="toc"><p class="title"><a class="hide_toc" href="#"><strong>Table of Contents</strong></a> <small>(<a href="#" class="float_toc">left</a>)</small></p></div>';
  $('#content').prepend(html);
  $('#toc').append(_toc);
  $('#toc .hide_toc').toggle(function() { 
    $('#toc .top').slideUp('fast');
    $('#toc').toggleClass('hidden');
    $('#toc .title small').toggle();
  }, function() {
    $('#toc .top').slideDown('fast');
    $('#toc').toggleClass('hidden');
    $('#toc .title small').toggle();
  });
  $('#toc .float_toc').toggle(function() { 
    $(this).text('float');
    $('#toc').toggleClass('nofloat');
  }, function() {
    $(this).text('left')
    $('#toc').toggleClass('nofloat');
  });
}

// ====================================================================

function findClassRoot(url) {
	return "/class" + url.split("/class").pop()
}

function selectorPopupURL(item) {
	var url = item.attr("href");
	if (url.indexOf("#") == -1) {
		return defaultPopupURL(findClassRoot(url));
	}
	url = url.split("#");
	var className = url[0].split("/").pop();
	if (!className) {
		className = $(".className:first").text()
	}
	className = className.split(".html")[0];
	return defaultPopupURL("/class/"+className+"/"+url[1])
}

function summaryPopupURL(item) {
	return selectorPopupURL(item.find("a"))
}

function classPopupURL(item) {
	return defaultPopupURL(findClassRoot(item.attr("href")));
}

function defaultPopupURL(url) {
	var url = url.split("/");
	url.splice(0,1,"popup");
	url = url.join("/");
	if (!url.endsWith(".html")) {
		url += ".html"
	}
	return detectRootURL() + url;
}

function detectRootURL() {
	return window.location.href + "/" + document.WEBDOC_RELATIVE_DOCUMENT_ROOT + "/"
}

if (!document["useVtips"]) {
	document["useVtips"] = true;
}

function createSelectorLinks() {
	var xOffset = 3;
   	var yOffset = -10; 
	var closeTimeout = 0;
	var timeout = 500;
	$("body")
		.append( "<p id='vtip'><img id='vtipArrow' /><iframe id='popupFrame'></iframe></p>" );
		
	var toolTip = $("p#vtip");
	var toolTipFrame = $("iframe#popupFrame");
	
      //$("p#vtip #vtipArrow").attr("src", "images/vtip_arrow.png");
	toolTip
		.mousemove(function(){
			clearTimeout(closeTimeout);
		}).mouseleave(function(){
			clearTimeout(closeTimeout);
			closeTimeout = setTimeout(close, timeout);
		});
						
	close = function() {
		clearTimeout(closeTimeout);
            toolTip.hide();
	};
	
	create = function(selector, urlFunction) {
		$(selector).unbind().hover(function(e) {
			close();
			toolTipFrame.attr("src", "");
			if (document["useVtips"] == false) { return };
			
			position = $(this).position();
	       var left = position.left + $(this).width()  + xOffset;
			var top = position.top + yOffset; 
			toolTip
				.css("position", "absolute")
				.css("top", top+"px")
				.css("left", left+"px");
			$(toolTip).position(top, left);
			
			url = urlFunction($(this));
	            
			toolTipFrame
				.attr("src", url)
				.load(function(){
					self = $(this);
					self.contents()
						.mousemove(function(){
							clearTimeout(closeTimeout);
						});
					var oDoc = (self.get(0).contentWindow || self.get(0).contentDocument);
				  	if (oDoc.document) oDoc = oDoc.document;
				  	oDoc["useVtips"]= false;
					
					self.width(Math.min(Math.max(self.contents().width()+10, 300), 450));
					self.height(Math.min(Math.max(self.contents().height()+10, 100), 300));
					toolTip.show();
				});
	        },
	        function() {
			clearTimeout(closeTimeout);
			closeTimeout = setTimeout(close, timeout);
		});
	};
	
	create("a.stSelector, a.method_link, a.stSymbolLiteral", selectorPopupURL);
	create("a.stClassLiteral, a.class_link", classPopupURL);
	create(".summary_signature", summaryPopupURL);
}

$(framesInit);
$(createSourceLinks);
$(createInheritedMethodLinks);
$(createDefineLinks);
$(createFullTreeLinks);
$(fixBoxInfoHeights);
$(searchFrameLinks);
$(linkSummaries);
$(keyboardShortcuts);
$(summaryToggle);
$(fixOutsideWorldLinks);
$(generateTOC);
/*$(createSelectorLinks);*/ 