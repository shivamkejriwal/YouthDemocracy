package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import project.Util;

public class ForumCategory {

	/*
	 * String Name
	 * String Description
	 * String Author
	 * Date
	 */
	
	public static void create(String Name,String Description,String Author) 
	{
		//System.out.println("__ForumCategory Create__");
		Entity forumCategory = get(Name);
		if(forumCategory==null)
		{
			forumCategory = new Entity("ForumCategory", Name);
			forumCategory.setProperty("Name", Name);
			forumCategory.setProperty("Description", Description);
			forumCategory.setProperty("Author", Author);
		}
		else
		{
			forumCategory=update(forumCategory,Name,Description,Author);
		}
		Util.persistEntity(forumCategory);
		
	}
	private static Entity update(Entity forumCategory, String Name, String Description, String Author) 
	{
		if (Name != null && !Name.equals("")) {
	        forumCategory.setProperty("Name", Name);
	      }
		if (Description != null && !Description.equals("")) {
	        forumCategory.setProperty("Description", Description);
	      }
		if (Author != null && !Author.equals("")) {
	        forumCategory.setProperty("Author", Author);
	      }
		
		return forumCategory;
	}
	public static String delete(String forumCategoryKey)
	{
	    Entity entity = get(forumCategoryKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("ForumCategory deleted successfully.");
	    } else
	      return("ForumCategory not found");      
	  }
	public static Entity get(String ForumCategoryName) 
	{
		Key key = KeyFactory.createKey("ForumCategory", ForumCategoryName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllForumCategorys() {
		Iterable<Entity> entities = Util.listEntities("ForumCategory", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getForumCategory(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="Name";
		Iterable<Entity> entities = Util.listEntities("ForumCategory", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getAllForumCategorys(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("ForumCategory", null, null,offset);
	  	return entities;
	}
	public static Iterable<Entity> getForumCategory(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="Name";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("ForumCategory", searchBy, searchFor,offset);
	  	return entities;
	}
}
