package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import project.model.Party;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.api.datastore.Query.SortDirection;

@SuppressWarnings("serial")
public class PartyServlet extends BaseServlet {

	private static final Logger logger = Logger.getLogger(PartyServlet.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__PartyServlet doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining Party listing");
	    String searchBy = req.getParameter("searchBy");
	    String searchFor = req.getParameter("searchFor");
	    int offset=Integer.parseInt(req.getParameter("offset"));
	    if(offset<0){offset=0;}
	    PrintWriter out = resp.getWriter();
	    if (searchFor == null || searchFor.equals("")) {
	    	
	    	DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
			Query query = new Query("Party");
			query.addSort("Page_Rank", SortDirection.ASCENDING);
			query.addSort("Name", SortDirection.ASCENDING);
			FetchOptions fetchOptions = FetchOptions.Builder.withLimit(5);
			PreparedQuery pq = ds.prepare(query);
			Iterable<Entity> entities = pq.asQueryResultList(fetchOptions.offset(offset));
	    	
			//Iterable<Entity> entities = Party.getAllPartys(offset);
			out.println(Util.writeJSON(entities));
	    } 
	    else{
	    	 Iterable<Entity> entities = Party.getParty(searchBy,searchFor,offset);
		      out.println(Util.writeJSON(entities));
	    }
	  }

	  /**
	   * Creates entity and persists the same
	   */
	  protected void doPut(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__PartyServlet doPut__");
	    logger.log(Level.INFO, "Creating Party");
	    String Name = req.getParameter("Name");
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
	    
	    //System.out.println("Party Desciption:"+Desciption);
	    //System.out.println("Party Page_Rank:"+Page_Rank);
	    Party.create(Name,Page_Rank,Image_URL
	    		,TraitName,TraitValue
	    		,Desciption,Professed_Manifesto,Actual_Manifesto);
	  }

	  /**
	   * Delete the entity from the datastore. Throws an exception if there are any
	   * orders associated with the party and ignores the delete action for it.
	   */
	  protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		 // System.out.println("__PartyServlet doDelete__");
		logger.log(Level.INFO, "deleting party");
	    String partyKey = req.getParameter("searchFor");
	    PrintWriter out = resp.getWriter();
	    try{      
	      out.println(Party.delete(partyKey));
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
		//System.out.println("__PartyServlet doPost__");
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
