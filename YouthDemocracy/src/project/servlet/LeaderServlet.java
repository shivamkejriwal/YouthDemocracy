package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import project.model.Leader;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Text;

@SuppressWarnings("serial")
public class LeaderServlet extends BaseServlet {

	private static final Logger logger = Logger.getLogger(LeaderServlet.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__LeaderServlet doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining Leader listing");
	    String searchBy = req.getParameter("searchBy");
	    String searchFor = req.getParameter("searchFor");
	    int offset=Integer.parseInt(req.getParameter("offset"));
	    //System.out.println("Current Offset:"+offset);
	    PrintWriter out = resp.getWriter();
	    if (searchFor == null || searchFor.equals("")) {
	    	
			DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
			Query query = new Query("Leader");
			query.addSort("Page_Rank", SortDirection.ASCENDING);
			query.addSort("Name", SortDirection.ASCENDING);
			FetchOptions fetchOptions = FetchOptions.Builder.withLimit(5);
			PreparedQuery pq = ds.prepare(query);
			Iterable<Entity> entities = pq.asQueryResultList(fetchOptions.offset(offset));
	    	
			//Iterable<Entity> entities = Leader.getAllLeaders(offset);
			//String response=Util.writeJSON(entities);
			//System.out.println("Reponse1:"+response);
			out.println(Util.writeJSON(entities));
			
	    } 
	    else{
	    	//System.out.println("searchFor:"+searchFor);
	    	 Iterable<Entity> entities = Leader.getLeader(searchBy,searchFor,offset);
	    	 //System.out.println("Entity:"+Util.writeJSON(entities));
		      out.println(Util.writeJSON(entities));
	    }
	  }

	  /**
	   * Creates entity and persists the same
	   */
	  protected void doPut(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__LeaderServlet doPut__");
	    logger.log(Level.INFO, "Creating Leader");
	    String Name = req.getParameter("Name");
	    String Party = req.getParameter("Party");
	    String Image_URL = req.getParameter("Image_URL");
	    int Page_Rank=Integer.parseInt(req.getParameter("Page_Rank"));
	    
	    Text Desciption = new Text(req.getParameter("Desciption"));
	    Text Professed_Manifesto = new Text(req.getParameter("Professed_Manifesto"));
	    Text Actual_Manifesto = new Text(req.getParameter("Actual_Manifesto"));
	    
	    int traitCount=7;
	    String[] TraitName = new String[traitCount];
	    int[] TraitValue = new int[traitCount];
	    TraitName[0]="Education";TraitValue[0]=Integer.parseInt(req.getParameter(TraitName[0]));
	    TraitName[1]="Military";TraitValue[1]=Integer.parseInt(req.getParameter(TraitName[1]));
	    TraitName[2]="Economy";TraitValue[2]=Integer.parseInt(req.getParameter(TraitName[2]));
	    TraitName[3]="Industry";TraitValue[3]=Integer.parseInt(req.getParameter(TraitName[3]));
	    TraitName[4]="Religion";TraitValue[4]=Integer.parseInt(req.getParameter(TraitName[4]));
	    TraitName[5]="Health";TraitValue[5]=Integer.parseInt(req.getParameter(TraitName[5]));
	    TraitName[6]="Environment";TraitValue[6]=Integer.parseInt(req.getParameter(TraitName[6]));
	    
	    //System.out.println("Leader Desciption:"+Desciption);
	    //System.out.println("Leader Page_Rank:"+Page_Rank);
	    Leader.create(Name,Party,Page_Rank,Image_URL
	    		,TraitName,TraitValue
	    		,Desciption,Professed_Manifesto,Actual_Manifesto);
	  }

	  /**
	   * Delete the entity from the datastore. Throws an exception if there are any
	   * orders associated with the leader and ignores the delete action for it.
	   */
	  protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		  //System.out.println("__LeaderServlet doDelete__");
		logger.log(Level.INFO, "deleting leader");
	    String leaderKey = req.getParameter("searchFor");
	    PrintWriter out = resp.getWriter();
	    try{      
	      out.println(Leader.delete(leaderKey));
	    } catch(Exception e) {
	      out.println(Util.getErrorMessage(e));
	    }      
	  }

	  /**
	   * Redirects to delete or insert entity based on the action in the HTTP
	   * request.
	   */
	  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__LeaderServlet doPost__");
	    String action = req.getParameter("action");
	    if (action.equalsIgnoreCase("delete")) {
	      doDelete(req, resp);
	      return;
	    } else if (action.equalsIgnoreCase("put")) {
	      doPut(req, resp);
	      return;
	    }
	  }
}
