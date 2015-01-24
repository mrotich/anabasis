/*
 * Each view has an HTML element associated with it.
 *
 */


// Ticket Model Module
(function ($) {

    TicketModel = Backbone.Model.extend({
        //Create a model to hold a ticket attribute
        defaults: {
            id: '',
            title:'',
        },

        initialize: function (id,title){
            this.id = id;
            this.title= title;
        }

    });

    TicketView = Backbone.View.extend({
        defaults:{
            temp:''
        },
        initialize: function(){
            this.temp = "#ticket-template";
            this.render();
        },

        render: function(){
            // Compile the template using underscore
            var template = _.template( $(this.temp).html(), {});
            // Load the compiled HTML into the Backbone "el"
            this.$el.append(template);
        },
    });

    TicketCollection = Backbone.Collection.extend({
        //This is our Ticket collection and holds our Ticket models
        initialize: function (models, options) {
            this.bind("add", options.view.render);
            //Listen for new additions to the collection and call a view function if so
        }
    });

    AppView = Backbone.View.extend({

        initialize: function () {
            this.ticketView = new TicketView({el: $("#ticket-container")});
            this.ticketCollection = new TicketCollection( null, { view: this.ticketView });
        },

        events: {
            "click #add-ticket":  "createTicket",
        },

        createTicket: function () {
            var ticket_name = prompt("What is your bug?");
            var ticket_model = new TicketModel({ title: ticket_name });
            this.ticketCollection.add( ticket_model );
            this.ticketView.render(ticket_model);
        }
    });

    var appview = new AppView({el: $("#app-container")});

})(jQuery);


// ============================================================================
