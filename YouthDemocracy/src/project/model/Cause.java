package project.model;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import project.Util;

public class Cause {

	/*
	 * String Name
	 * String Description
	 * int Support
	 */
	
	public static void create( String Name,String Description,int Support) 
	{
		//System.out.println("__Cause Create__");
		Entity cause = get(Name);
		if(cause==null)
		{
			cause = new Entity("Cause", Name);
			cause.setProperty("Name", Name);
			cause.setProperty("Description", Description);
			cause.setProperty("Support", Support);
		}
		else
		{
			cause=update(cause,Name,Description,Support);
		}
		Util.persistEntity(cause);
		
	}
	private static Entity update(Entity cause, String Name,String Description,int Support) 
	{
		if (Name != null && !Name.equals("")) {
	        cause.setProperty("Name", Name);
	      }
		if (Description != null && !Description.equals("")) {
	        cause.setProperty("Description", Description);
	      }
		if (Support>=0 && Support<=10) {
	        cause.setProperty("Trait", Support);
	      }
		
		return cause;
	}
	public static String delete(String causeKey)
	{
	    Entity entity = get(causeKey);    
	    if(entity != null){
	      Util.deleteEntity(entity.getKey());
	      return("Cause deleted successfully.");
	    } else
	      return("Cause not found");      
	  }
	public static Entity get(String CauseName) 
	{
		Key key = KeyFactory.createKey("Cause", CauseName);
		return Util.findEntity(key);
	}
	public static Iterable<Entity> getAllCauses() {
		Iterable<Entity> entities = Util.listEntities("Cause", null, null);
	  	return entities;
	}
	public static Iterable<Entity> getCause(String searchBy,String searchFor) {
		if(searchBy==null)searchBy="Name";
		Iterable<Entity> entities = Util.listEntities("Cause", searchBy, searchFor);
	  	return entities;
	}
	public static Iterable<Entity> getAllCauses(int offset) {
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("Cause", null, null,offset);
	  	return entities;
	}
	public static Iterable<Entity> getCause(String searchBy,String searchFor,int offset) {
		if(searchBy==null)searchBy="Name";
		if(offset<0)offset=0;
		Iterable<Entity> entities = Util.listEntities("Cause", searchBy, searchFor,offset);
	  	return entities;
	}
}
