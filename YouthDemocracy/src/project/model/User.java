package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import project.Util;

public class User {

	/*
	 * String id
	 * String first_name
	 * String last_name
	 * string Email
	 * String Gender
	 * String Hometown
	 */
	
	public static void create(String[]Name,String[]Value) 
	{
		//System.out.println("__User Create__");
		Entity user = get(Value[0]);
		if(user==null)
		{
			user = new Entity("User", Value[0]);
			
			for(int i=0;i<Value.length;i++){
				user.setProperty(Name[i], Value[i]);
			}
			
		}
		else
		{
			user=update(user,Name,Value);
		}
		Util.persistEntity(user);
		
	}
	private static Entity update(Entity user,String[]Name,String[]Value) 
	{
		for(int i=0;i<Value.length;i++){
			if(Value[i]!=null && Value[i]!="")
			user.setProperty(Name[i], Value[i]);
		}
		return user;
	}
	public static String delete(String userKey)
	{
	    Entity entity = get(userKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("User deleted successfully.");
	    } else
	      return("User not found");      
	  }
	public static Entity get(String UserName) 
	{
		Key key = KeyFactory.createKey("User", UserName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllUsers() {
		Iterable<Entity> entities = Util.listEntities("User", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getUser(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="id";
		Iterable<Entity> entities = Util.listEntities("User", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getAllUsers(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("User", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getUser(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="id";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("User", searchBy, searchFor);
	  	return entities;
	}
}
