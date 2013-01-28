package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import project.Util;

public class ForumTopic {

	/*
	 * String Name
	 * String Description
	 * String Category
	 * String Author
	 * Date
	 */
	
	public static void create(String Name,String Description,String Category,String Author) 
	{
		//System.out.println("__ForumTopic Create__");
		Entity forumTopic = get(Name);
		if(forumTopic==null)
		{
			forumTopic = new Entity("ForumTopic", Name);
			forumTopic.setProperty("Name", Name);
			forumTopic.setProperty("Description", Description);
			forumTopic.setProperty("Category", Category);
			forumTopic.setProperty("Author", Author);
		}
		else
		{
			forumTopic=update(forumTopic,Name,Description,Category,Author);
		}
		Util.persistEntity(forumTopic);
		
	}
	private static Entity update(Entity forumTopic, String Name, String Description,String Category, String Author) 
	{
		if (Name != null && !Name.equals("")) {
	        forumTopic.setProperty("Name", Name);
	      }
		if (Description != null && !Description.equals("")) {
	        forumTopic.setProperty("Description", Description);
	      }
		if (Category != null && !Category.equals("")) {
	        forumTopic.setProperty("Category", Category);
	      }
		if (Author != null && !Author.equals("")) {
	        forumTopic.setProperty("Author", Author);
	      }
		
		return forumTopic;
	}
	public static String delete(String forumTopicKey)
	{
	    Entity entity = get(forumTopicKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("ForumTopic deleted successfully.");
	    } else
	      return("ForumTopic not found");      
	  }
	public static Entity get(String ForumTopicName) 
	{
		Key key = KeyFactory.createKey("ForumTopic", ForumTopicName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllForumTopics() {
		Iterable<Entity> entities = Util.listEntities("ForumTopic", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getForumTopic(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="Name";
		Iterable<Entity> entities = Util.listEntities("ForumTopic", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getAllForumTopics(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("ForumTopic", null, null,offset);
	  	return entities;
	}
	public static Iterable<Entity> getForumTopic(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="Name";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("ForumTopic", searchBy, searchFor,offset);
	  	return entities;
	}
}
