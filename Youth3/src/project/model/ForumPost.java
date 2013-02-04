package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import project.Util;

public class ForumPost {

	/*
	 * String Topic
	 * String Content
	 * String Author
	 * Date
	 */
	
	public static void create(String Topic,String Content,String Author) 
	{
		//System.out.println("__ForumPost Create__");
		Entity forumCat = get(Topic);
		if(forumCat==null)
		{
			forumCat = new Entity("ForumPost", Topic);
			forumCat.setProperty("Topic", Topic);
			forumCat.setProperty("Content", Content);
			forumCat.setProperty("Author", Author);
		}
		else
		{
			forumCat=update(forumCat,Topic,Content,Author);
		}
		Util.persistEntity(forumCat);
		
	}
	private static Entity update(Entity forumCat, String Topic, String Content, String Author) 
	{
		if (Topic != null && !Topic.equals("")) {
	        forumCat.setProperty("Topic", Topic);
	      }
		if (Content != null && !Content.equals("")) {
	        forumCat.setProperty("Content", Content);
	      }
		if (Author != null && !Author.equals("")) {
	        forumCat.setProperty("Author", Author);
	      }
		
		return forumCat;
	}
	public static String delete(String forumCatKey)
	{
	    Entity entity = get(forumCatKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("ForumPost deleted successfully.");
	    } else
	      return("ForumPost not found");      
	  }
	public static Entity get(String ForumPostName) 
	{
		Key key = KeyFactory.createKey("ForumPost", ForumPostName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllForumPosts() {
		Iterable<Entity> entities = Util.listEntities("ForumPost", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getForumPost(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="Topic";
		Iterable<Entity> entities = Util.listEntities("ForumPost", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getAllForumPosts(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("ForumPost", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getForumPost(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="Topic";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("ForumPost", searchBy, searchFor);
	  	return entities;
	}
}
