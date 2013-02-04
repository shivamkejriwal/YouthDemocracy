package project.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import project.Util;
import project.model.ForumCategory;

import com.google.appengine.api.datastore.Entity;

@SuppressWarnings("serial")
public class ForumCategoryServlet extends BaseServlet {

	private static final Logger logger = Logger.getLogger(ForumCategoryServlet.class.getCanonicalName());

	  /**
	   * Searches for the entity based on the search criteria and returns result in
	   * JSON format
	   */
	  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__ForumCategoryServlet doGet__");
	    super.doGet(req, resp);
	    logger.log(Level.INFO, "Obtaining ForumCategory listing");
	    String searchBy = req.getParameter("searchBy");
	    String searchFor = req.getParameter("searchFor");
	    //int offset=Integer.parseInt(req.getParameter("offset"));
	    PrintWriter out = resp.getWriter();
	    if (searchFor == null || searchFor.equals("")) {
	      Iterable<Entity> entities = ForumCategory.getAllForumCategorys();
	      out.println(Util.writeJSON(entities));
	    } 
	    else{
	    	 Iterable<Entity> entities = ForumCategory.getForumCategory(searchBy,searchFor);
		      out.println(Util.writeJSON(entities));
	    }
	  }

	  /**
	   * Creates entity and persists the same
	   */
	  protected void doPut(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		//System.out.println("__ForumCategoryServlet doPut__");
	    logger.log(Level.INFO, "Creating ForumCategory");
	    String Name = req.getParameter("Name");
	    String Description = req.getParameter("Description");
	    String Author = req.getParameter("Author");
	    ForumCategory.create(Name,Description,Author);
	  }

	  /**
	   * Delete the entity from the datastore. Throws an exception if there are any
	   * orders associated with the item and ignores the delete action for it.
	   */
	  protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
	      throws ServletException, IOException {
		 // System.out.println("__ForumCategoryServlet doDelete__");
		logger.log(Level.INFO, "deleting ForumCategory");
	    String itemKey = req.getParameter("searchFor");
	    PrintWriter out = resp.getWriter();
	    try{      
	      out.println(ForumCategory.delete(itemKey));
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
		//System.out.println("__ForumCategoryServlet doPost__");
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
