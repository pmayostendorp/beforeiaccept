$(document).ready(function(){

	$("#commentform").submit(function(){

		$('.comment-response.alert-warning').not(':visible').slideDown();
		$('.comment-response.alert-danger:visible, .comment-response.alert-success:visible').slideUp();

		var data={
			'action':'add_singular_comment',
			'comment':$("#comment").val(),
			'post_id':$("#comment-form-group").data('id')
		};

		$.post('/wp-admin/admin-ajax.php', data, function(response) {
			$('.comment-response.alert-warning').delay(700).slideUp();
			console.log(response);
			if(typeof(response)=='string'){
				$('.comment-response.alert-danger').html(decodeURI(response));
				$('.comment-response.alert-danger').delay(1000).slideDown();
			} else {
				if(response.success && response.data.message){
					$('.comment-response.alert-success').text(response.data.message);
					$('.comment-response.alert-success').delay(1000).slideDown(function(){
						var $clone = $("#comments li.hidden").clone(true);
						$clone.find(".author-link").text(response.data.comment_meta.comment_author);
						$clone.find(".author-link").attr('href', response.data.comment_meta.comment_author_link);
						$clone.find(".comment-body").html(response.data.comment_meta.comment);
						$clone.find(".comment-ago").text(' posted ' + 'now');
						$clone.removeClass('hidden');
						$("#comments").prepend($clone);
						$clone = '';
					});
				}
				if(!response.success && response.data.message){
					$('.comment-response.alert-danger').text(response.data.message);
					$('.comment-response.alert-danger').delay(1000).slideDown();
				}
			}

		});

		return false;
	});

	$("#load-more-comments").on('click', function(e){

		var data = {
			'action':'load_more_comments',
			'offset':$(this).data('offset'),
			'count':$(this).data('count'),
			'id':$(this).data('id'),
			'total':$(this).data('total')
		};

		$("#load-more-comments").parent().hide();
		$("#loading-more-comments").parent().show();

		$.post('/wp-admin/admin-ajax.php', data, function(response) {
			var msg = JSON.parse(response);

			$("#loading-more-comments").parent().delay(700).fadeOut();

			for(i in msg.comments){
				var $clone = $("#comments li.hidden").clone(true);
				$clone.find(".author-link").text(msg.comments[i].comment_author);
				$clone.find(".author-link").attr('href', msg.comments[i].comment_author_url);
				$clone.find(".comment-body").html(msg.comments[i].comment);
				$clone.find(".comment-ago").text(' posted ' + msg.comments[i].comment_posted_when);
				$clone.removeClass('hidden');
				$("#comments").append($clone);
			}

			if( msg.new_offset ){
				$("#load-more-comments").data('offset', msg.new_offset);
			}

			if( msg.no_more_comments==true ){
				$("#no-more-comments").parent().delay(1000).fadeIn();
			} else {
				$("#load-more-comments").parent().delay(1000).fadeIn();
			}


		});

		return false;
	});
});