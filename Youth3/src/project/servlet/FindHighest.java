package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

@SuppressWarnings("serial")
public class FindHighest extends BaseServlet {

	private static final Logger logger = Logger.getLogger(FindHighest.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__FindHighest doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining Data listing");
	    String searchBy = req.getParameter("searchBy");
	    String propertyName = req.getParameter("propertyName");
	    
	    DatastoreService ds = DatastoreServiceFactory.getDatastoreService();
		  Query query = new Query(searchBy).addSort(propertyName, SortDirection.DESCENDING);
		  Entity result = ds.prepare(query).asIterator().next();
		  PrintWriter out = resp.getWriter();
		  out.println( Util.writeJSON(result) );
	  }
	  
	  
}
	
	
