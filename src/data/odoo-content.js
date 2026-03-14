export const odooContent = {
  sections: [
    {
      id: "basics",
      label: "// BASICS",
      articles: [
        {
          id: "architecture",
          title: "Architecture Overview",
          category: "BASICS",
          readTime: "10 min",
          content: `
<h3>01. What is Odoo?</h3>
<p>Odoo is a suite of open-source business applications covering CRM, e-Commerce, accounting, inventory, point-of-sale, project management, and more. For developers, it provides a powerful framework built on Python with a PostgreSQL backend.</p>
<pre><code class="lang-text">BROWSER ──► JavaScript (OWL Framework)
              │
           HTTP/JSON-RPC
              │
           Python (Odoo Server)
              │  ├── Models (ORM)
              │  ├── Controllers (Routes)
              │  └── Services
              │
           PostgreSQL (Data Layer)</code></pre>

<h3>02. Key Architectural Layers</h3>
<ul>
  <li><strong>Presentation Layer:</strong> OWL components, QWeb templates, Bootstrap CSS</li>
  <li><strong>Business Logic:</strong> Python models with ORM, computed fields, wizards</li>
  <li><strong>Data Layer:</strong> PostgreSQL via the Odoo ORM abstraction</li>
</ul>

<h3>03. Request Lifecycle</h3>
<pre><code class="lang-python"># HTTP Controller → Model → Database
@http.route('/api/my_endpoint', auth='user', type='json')
def my_endpoint(self, **kwargs):
    record = request.env['my.model'].search([('active', '=', True)])
    return {'data': record.read(['name', 'state'])}</code></pre>
          `
        },
        {
          id: "module-structure",
          title: "Module Structure",
          category: "BASICS",
          readTime: "8 min",
          content: `
<h3>01. Standard Module Layout</h3>
<pre><code class="lang-bash">my_module/
├── __init__.py           # Python package marker
├── __manifest__.py       # Module metadata & dependencies
├── models/
│   ├── __init__.py
│   └── my_model.py       # ORM model definitions
├── views/
│   ├── my_views.xml      # Form, tree, kanban views
│   └── menu.xml          # Menu items
├── controllers/
│   ├── __init__.py
│   └── main.py           # HTTP routes
├── security/
│   ├── ir.model.access.csv
│   └── security.xml
├── data/
│   └── demo.xml          # Demo/seed data
├── wizard/
│   └── my_wizard.py
├── report/
│   └── my_report.xml
└── static/
    └── src/
        └── js/
        └── css/</code></pre>

<h3>02. Manifest File</h3>
<pre><code class="lang-python"># __manifest__.py
{
    'name': 'My Custom Module',
    'version': '17.0.1.0.0',
    'author': 'Abhishek Pal',
    'category': 'Custom',
    'depends': ['base', 'sale', 'account'],
    'data': [
        'security/ir.model.access.csv',
        'views/my_views.xml',
        'views/menu.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
}</code></pre>
          `
        },
        {
          id: "orm",
          title: "ORM Fundamentals",
          category: "BASICS",
          readTime: "15 min",
          content: `
<h3>01. Defining a Model</h3>
<pre><code class="lang-python">from odoo import models, fields, api

class LibraryBook(models.Model):
    _name = 'library.book'
    _description = 'Library Book'
    _order = 'date_release desc'

    name = fields.Char('Title', required=True, index=True)
    date_release = fields.Date('Release Date')
    author_ids = fields.Many2many('res.partner', string='Authors')
    state = fields.Selection([
        ('draft', 'Draft'),
        ('available', 'Available'),
        ('borrowed', 'Borrowed'),
    ], default='draft')
    active = fields.Boolean(default=True)</code></pre>

<h3>02. Common ORM Methods</h3>
<pre><code class="lang-python"># Search
books = self.env['library.book'].search([
    ('state', '=', 'available'),
    ('date_release', '>=', '2024-01-01'),
], limit=10, order='name asc')

# Create
new_book = self.env['library.book'].create({
    'name': 'Python in Practice',
    'state': 'available',
})

# Write
books.write({'state': 'borrowed'})

# Unlink
books.filtered(lambda b: b.state == 'draft').unlink()

# Browse by ID
book = self.env['library.book'].browse(42)</code></pre>

<h3>03. Compute Fields</h3>
<pre><code class="lang-python">pages = fields.Integer('Pages')
page_category = fields.Char(compute='_compute_page_category', store=True)

@api.depends('pages')
def _compute_page_category(self):
    for book in self:
        if book.pages < 100:
            book.page_category = 'Short'
        elif book.pages < 500:
            book.page_category = 'Medium'
        else:
            book.page_category = 'Long'</code></pre>
          `
        }
      ]
    },
    {
      id: "technical",
      label: "// TECHNICAL DEV",
      articles: [
        {
          id: "custom-models",
          title: "Creating Custom Models",
          category: "TECHNICAL DEV",
          readTime: "15 min",
          content: `
<h3>01. Model Inheritance Types</h3>
<pre><code class="lang-python"># Classical (extends own table)
class MyModel(models.Model):
    _name = 'my.model'
    _description = 'My Model'

# Inheritance (extends existing model)
class SaleOrderExtended(models.Model):
    _inherit = 'sale.order'
    custom_field = fields.Char('Custom Field')

# Delegation (links via table join)
class MyDelegated(models.Model):
    _name = 'my.delegated'
    _inherits = {'res.partner': 'partner_id'}
    partner_id = fields.Many2one('res.partner', required=True)</code></pre>

<h3>02. Field Types Reference</h3>
<pre><code class="lang-python">name = fields.Char(string='Name', required=True, size=100)
description = fields.Text(string='Description')
amount = fields.Float(string='Amount', digits=(16, 2))
count = fields.Integer(string='Count')
active = fields.Boolean(default=True)
date = fields.Date(string='Date')
datetime = fields.Datetime(string='Date & Time')
image = fields.Binary(string='Image', attachment=True)

# Relational fields
partner_id = fields.Many2one('res.partner', ondelete='restrict')
tag_ids = fields.Many2many('res.partner.category')
line_ids = fields.One2many('sale.order.line', 'order_id')</code></pre>
          `
        },
        {
          id: "views",
          title: "Views (Form/Tree/Kanban)",
          category: "TECHNICAL DEV",
          readTime: "12 min",
          content: `
<h3>01. Form View</h3>
<pre><code class="lang-xml">&lt;record id="view_library_book_form" model="ir.ui.view"&gt;
    &lt;field name="name"&gt;library.book.form&lt;/field&gt;
    &lt;field name="model"&gt;library.book&lt;/field&gt;
    &lt;field name="arch" type="xml"&gt;
        &lt;form string="Book"&gt;
            &lt;header&gt;
                &lt;button name="action_available" type="object"
                        string="Set Available" class="btn-primary"
                        attrs="{'invisible': [('state','=','available')]}"/ &gt;
                &lt;field name="state" widget="statusbar"
                       statusbar_visible="draft,available,borrowed"/&gt;
            &lt;/header&gt;
            &lt;sheet&gt;
                &lt;group&gt;
                    &lt;field name="name"/&gt;
                    &lt;field name="date_release"/&gt;
                    &lt;field name="author_ids" widget="many2many_tags"/&gt;
                &lt;/group&gt;
                &lt;notebook&gt;
                    &lt;page string="Details"&gt;
                        &lt;field name="description"/&gt;
                    &lt;/page&gt;
                &lt;/notebook&gt;
            &lt;/sheet&gt;
        &lt;/form&gt;
    &lt;/field&gt;
&lt;/record&gt;</code></pre>

<h3>02. Tree View</h3>
<pre><code class="lang-xml">&lt;record id="view_library_book_tree" model="ir.ui.view"&gt;
    &lt;field name="name"&gt;library.book.tree&lt;/field&gt;
    &lt;field name="model"&gt;library.book&lt;/field&gt;
    &lt;field name="arch" type="xml"&gt;
        &lt;tree string="Books" decoration-info="state=='draft'"
              decoration-success="state=='available'"&gt;
            &lt;field name="name"/&gt;
            &lt;field name="author_ids" widget="many2many_tags"/&gt;
            &lt;field name="date_release"/&gt;
            &lt;field name="state"/&gt;
        &lt;/tree&gt;
    &lt;/field&gt;
&lt;/record&gt;</code></pre>
          `
        },
        {
          id: "controllers",
          title: "Controllers & Routes",
          category: "TECHNICAL DEV",
          readTime: "10 min",
          content: `
<h3>01. HTTP Controller</h3>
<pre><code class="lang-python">from odoo import http
from odoo.http import request
import json

class WebhookController(http.Controller):

    @http.route('/webhook/receive', 
                auth='public', 
                type='json', 
                methods=['POST'],
                csrf=False)
    def receive_webhook(self, **kwargs):
        data = request.get_json_data()
        
        # Process the incoming data
        self.env['webhook.log'].sudo().create({
            'payload': json.dumps(data),
            'source': request.httprequest.remote_addr,
        })
        
        return {'status': 'ok', 'received': True}

    @http.route('/api/books', auth='user', type='json')
    def get_books(self, **kwargs):
        books = request.env['library.book'].search([
            ('state', '=', 'available')
        ])
        return books.read(['name', 'state', 'date_release'])</code></pre>
          `
        },
        {
          id: "security",
          title: "Security & Access Rules",
          category: "TECHNICAL DEV",
          readTime: "8 min",
          content: `
<h3>01. Access Control List (ir.model.access.csv)</h3>
<pre><code class="lang-csv">id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_library_book_user,library.book.user,model_library_book,base.group_user,1,0,0,0
access_library_book_manager,library.book.manager,model_library_book,base.group_system,1,1,1,1</code></pre>

<h3>02. Record Rules</h3>
<pre><code class="lang-xml">&lt;record id="rule_library_book_own" model="ir.rule"&gt;
    &lt;field name="name"&gt;Library Book: Own Records&lt;/field&gt;
    &lt;field name="model_id" ref="model_library_book"/&gt;
    &lt;field name="groups" eval="[(4, ref('base.group_user'))]"/&gt;
    &lt;field name="domain_force"&gt;
        [('create_uid', '=', user.id)]
    &lt;/field&gt;
    &lt;field name="perm_read" eval="True"/&gt;
    &lt;field name="perm_write" eval="True"/&gt;
    &lt;field name="perm_create" eval="True"/&gt;
    &lt;field name="perm_unlink" eval="False"/&gt;
&lt;/record&gt;</code></pre>
          `
        }
      ]
    },
    {
      id: "advanced",
      label: "// ADVANCED",
      articles: [
        {
          id: "webhooks",
          title: "API Integration (Webhooks)",
          category: "ADVANCED",
          readTime: "18 min",
          content: `
<h3>01. Webhook Sender (Outgoing)</h3>
<pre><code class="lang-python">import requests
import json
from odoo import models, fields, api

class SaleOrder(models.Model):
    _inherit = 'sale.order'

    @api.model
    def create(self, vals):
        record = super().create(vals)
        self._send_webhook('sale.order.created', record)
        return record

    def _send_webhook(self, event_type, record):
        webhook_url = self.env['ir.config_parameter'].sudo().get_param(
            'my_module.webhook_url'
        )
        if not webhook_url:
            return
        
        payload = {
            'event': event_type,
            'data': {
                'id': record.id,
                'name': record.name,
                'partner': record.partner_id.name,
                'amount_total': record.amount_total,
            }
        }
        
        try:
            response = requests.post(
                webhook_url,
                data=json.dumps(payload),
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            response.raise_for_status()
        except Exception as e:
            self.env['webhook.log'].sudo().create({
                'event': event_type,
                'status': 'failed',
                'error': str(e),
            })</code></pre>
          `
        },
        {
          id: "redis",
          title: "Redis Caching in Odoo",
          category: "ADVANCED",
          readTime: "12 min",
          content: `
<h3>01. Redis Setup & Connection</h3>
<pre><code class="lang-python">import redis
import json
from functools import wraps

# Connect to Redis
r = redis.Redis(
    host='localhost',
    port=6379,
    db=0,
    decode_responses=True
)

def redis_cache(key_prefix, ttl=300):
    """Decorator to cache model method results in Redis."""
    def decorator(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            cache_key = f"{key_prefix}:{self.id}:{args}"
            cached = r.get(cache_key)
            if cached:
                return json.loads(cached)
            
            result = func(self, *args, **kwargs)
            r.setex(cache_key, ttl, json.dumps(result))
            return result
        return wrapper
    return decorator

class AccountReport(models.Model):
    _inherit = 'account.move'

    @redis_cache('account_summary', ttl=600)
    def get_summary_data(self):
        # Expensive computation cached for 10 minutes
        return self.env['account.move.line'].search([
            ('move_id', '=', self.id)
        ]).read(['name', 'debit', 'credit'])</code></pre>
          `
        },
        {
          id: "aws-deploy",
          title: "Deployment on AWS EC2",
          category: "ADVANCED",
          readTime: "20 min",
          content: `
<h3>01. EC2 Setup for Odoo 17</h3>
<pre><code class="lang-bash"># 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install dependencies
sudo apt install python3-pip python3-dev libxml2-dev libxslt1-dev \\
    libldap2-dev libsasl2-dev libtiff5-dev libjpeg8-dev libopenjp2-7-dev \\
    zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev libharfbuzz-dev \\
    libfribidi-dev libxcb1-dev postgresql postgresql-client -y

# 3. Create Odoo user
sudo adduser --system --home=/opt/odoo --group odoo

# 4. Install Odoo
sudo git clone https://github.com/odoo/odoo --depth 1 \\
    --branch 17.0 /opt/odoo/odoo

# 5. Install Python requirements
sudo -u odoo pip3 install -r /opt/odoo/odoo/requirements.txt</code></pre>

<h3>02. Nginx Reverse Proxy Config</h3>
<pre><code class="lang-nginx">server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    location /longpolling {
        proxy_pass http://127.0.0.1:8072;
    }
}</code></pre>
          `
        }
      ]
    }
  ]
};
