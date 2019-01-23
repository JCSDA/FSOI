import {Component, OnInit} from '@angular/core';
import {OptionsComponent} from '../options/options.component';
import {MatDialog} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {DisplayComponent} from '../display/display.component';
import {AppComponent} from '../app.component';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit
{
  /* error messages */
  errorMessages = [];

  /* default values are not a valid request */
  invalidRequest = true;

  /* a default start date */
  startDate = new Date(2015, 1, 20); /* 2015-FEB-20 */

  /* a default end date */
  endDate = new Date(2015, 1, 21); /* 2015-FEB-21 */

  /* cycle options */
  c00z = false;
  c06z = false;
  c12z = false;
  c18z = true;

  /* norm options */
  norm = {
    'options': [
      {'name': 'dry', 'selected': true},
      {'name': 'moist', 'selected': false}
    ]
  };

  /* center options */
  centers = {
    'options': [
      {'name': 'EMC', 'selected': true},
      {'name': 'GMAO', 'selected': true},
      {'name': 'NRL', 'selected': true},
      {'name': 'JMA_adj', 'selected': false},
      {'name': 'JMA_ens', 'selected': false},
      {'name': 'MET', 'selected': false},
      {'name': 'MeteoFr', 'selected': false}
    ]
  };

  /* platform options */
  platforms = {
    'options': [
      {'name': 'Radiosonde', 'selected': true},
      {'name': 'Dropsonde', 'selected': true},
      {'name': 'Ship', 'selected': true},
      {'name': 'Buoy', 'selected': true},
      {'name': 'Land Surface', 'selected': true},
      {'name': 'Aircraft', 'selected': true},
      {'name': 'PIBAL', 'selected': true},
      {'name': 'GPSRO', 'selected': true},
      {'name': 'Profiler Wind', 'selected': true},
      {'name': 'NEXRAD Wind', 'selected': true},
      {'name': 'Geo Wind', 'selected': true},
      {'name': 'MODIS Wind', 'selected': true},
      {'name': 'AVHRR Wind', 'selected': true},
      {'name': 'ASCAT Wind', 'selected': true},
      {'name': 'RAPIDSCAT Wind', 'selected': true},
      {'name': 'Ozone', 'selected': true},
      {'name': 'TMI Rain Rate', 'selected': true},
      {'name': 'Synthetic', 'selected': true},
      {'name': 'AIRS', 'selected': true},
      {'name': 'AMSUA', 'selected': true},
      {'name': 'MHS', 'selected': true},
      {'name': 'ATMS', 'selected': true},
      {'name': 'CrIS', 'selected': true},
      {'name': 'HIRS', 'selected': true},
      {'name': 'IASI', 'selected': true},
      {'name': 'Seviri', 'selected': true},
      {'name': 'GOES', 'selected': true},
      {'name': 'SSMIS', 'selected': true},
      {'name': 'UNKNOWN', 'selected': true}
    ],
    'EMC': [
      {'name': 'Radiosonde', 'selected': true},
      {'name': 'Dropsonde', 'selected': true},
      {'name': 'Ship', 'selected': true},
      {'name': 'Buoy', 'selected': true},
      {'name': 'Land Surface', 'selected': true},
      {'name': 'Aircraft', 'selected': true},
      {'name': 'PIBAL', 'selected': true},
      {'name': 'GPSRO', 'selected': true},
      {'name': 'Profiler Wind', 'selected': true},
      {'name': 'NEXRAD Wind', 'selected': true},
      {'name': 'Geo Wind', 'selected': true},
      {'name': 'MODIS Wind', 'selected': true},
      {'name': 'AVHRR Wind', 'selected': true},
      {'name': 'ASCAT Wind', 'selected': true},
      {'name': 'RAPIDSCAT Wind', 'selected': true},
      {'name': 'Ozone', 'selected': true},
      {'name': 'TMI Rain Rate', 'selected': true},
      {'name': 'Synthetic', 'selected': true},
      {'name': 'AIRS', 'selected': true},
      {'name': 'AMSUA', 'selected': true},
      {'name': 'MHS', 'selected': true},
      {'name': 'ATMS', 'selected': true},
      {'name': 'CrIS', 'selected': true},
      {'name': 'HIRS', 'selected': true},
      {'name': 'IASI', 'selected': true},
      {'name': 'Seviri', 'selected': true},
      {'name': 'GOES', 'selected': true},
      {'name': 'SSMIS', 'selected': true},
      {'name': 'UNKNOWN', 'selected': true}
    ],
    'GMAO': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false}
    ],
    'NRL': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'LEO-GEO', 'selected': false},
      {'name': 'WindSat', 'selected': false},
      {'name': 'R/S AMV', 'selected': false},
      {'name': 'Aus Syn', 'selected': false},
      {'name': 'UAS', 'selected': false},
      {'name': 'TPW', 'selected': false},
      {'name': 'PRH', 'selected': false}
    ],
    'JMA_adj': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'LEO-GEO', 'selected': false},
      {'name': 'MTSAT', 'selected': false},
      {'name': 'MVIRI', 'selected': false},
      {'name': 'AMSR', 'selected': false}
    ],
    'JMA_ens': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'LEO-GEO', 'selected': false},
      {'name': 'MTSAT', 'selected': false},
      {'name': 'MVIRI', 'selected': false},
      {'name': 'AMSR', 'selected': false}
    ],
    'MET': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'NEXRAD Wind', 'selected': false},
      {'name': 'Geo Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'RAPIDSCAT Wind', 'selected': false},
      {'name': 'Ozone', 'selected': false},
      {'name': 'TMI Rain Rate', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'LEO-GEO', 'selected': false},
      {'name': 'MTSAT', 'selected': false},
      {'name': 'MVIRI', 'selected': false},
      {'name': 'Ground GPS', 'selected': false}
    ],
    'MeteoFr': [
      {'name': 'Radiosonde', 'selected': false},
      {'name': 'Dropsonde', 'selected': false},
      {'name': 'Ship', 'selected': false},
      {'name': 'Buoy', 'selected': false},
      {'name': 'Land Surface', 'selected': false},
      {'name': 'Aircraft', 'selected': false},
      {'name': 'PIBAL', 'selected': false},
      {'name': 'GPSRO', 'selected': false},
      {'name': 'Profiler Wind', 'selected': false},
      {'name': 'GOES Wind', 'selected': false},
      {'name': 'GMS Wind', 'selected': false},
      {'name': 'Misc SatWind', 'selected': false},
      {'name': 'METEOSAT Wind', 'selected': false},
      {'name': 'MODIS Wind', 'selected': false},
      {'name': 'AVHRR Wind', 'selected': false},
      {'name': 'ASCAT Wind', 'selected': false},
      {'name': 'Synthetic', 'selected': false},
      {'name': 'AIRS', 'selected': false},
      {'name': 'AMSUA', 'selected': false},
      {'name': 'MHS', 'selected': false},
      {'name': 'ATMS', 'selected': false},
      {'name': 'CrIS', 'selected': false},
      {'name': 'HIRS', 'selected': false},
      {'name': 'IASI', 'selected': false},
      {'name': 'GOES', 'selected': false},
      {'name': 'Seviri', 'selected': false},
      {'name': 'SSMIS', 'selected': false},
      {'name': 'Ground GPS', 'selected': false}
    ]
  };

  /* default summaries */
  normSummary = '(0) No selections made';
  centersSummary = '(0) No selections made';
  platformsSummary = '(0) No selections made';

  /* progress bar normally hidden */
  submitButtonMode = 'open';
  progressBarMode = 'closed';

  /* reference to display component */
  display: DisplayComponent;

  /* reference to app component */
  app: AppComponent;

  /* Object that contains a request to the server */
  private requestData: object;

  /* Websocket connection */
  private websocket: WebSocket;
  private websocketUrl = 'wss://0dsx2wip69.execute-api.us-east-1.amazonaws.com/v1';

  /* Track all requests in this session */
  private sessionRequests = [];


  /**
   * Constructor
   *
   * @param dialog dependency injection
   * @param http dependency injection
   * @param route dependency injection
   */
  constructor(private dialog: MatDialog, private http: HttpClient, private route: ActivatedRoute)
  {
  }

  /**
   * Convert a date to a string
   *
   * @param date in the format yyyyMMdd
   */
  static dateToString(date): string
  {
    return date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
  }


  /**
   * Initialize the component
   */
  ngOnInit()
  {
    this.updateSummaries();
    this.validateRequest();
    this.route.queryParams.subscribe(this.queryParamsChanged.bind(this));
  }


  /**
   * Set a reference to the display component
   *
   * @param display Reference to the display component
   */
  setDisplay(display: DisplayComponent): void
  {
    this.display = display;
  }


  /**
   * Set a reference to the app component
   *
   * @param app Reference to the app component
   */
  setApp(app: AppComponent): void
  {
    this.app = app;
  }


  /**
   * Update summaries for all choice options (i.e., string label based on selected choices)
   */
  updateSummaries(): void
  {
    this.normSummary = this.createSummary(this.norm);
    this.centersSummary = this.createSummary(this.centers);
    this.platformsSummary = this.createSummary(this.platforms);
  }


  /**
   * Show day/night maps when mouse moves into a cycle checkbox
   *
   * @param cycle The cycle to show
   */
  showCycleHint(cycle): void
  {
    document.getElementById('cycle_hint').setAttribute('src', 'assets/hint-' + cycle + 'z.jpg');
  }


  /**
   * Hide day/night maps when mouse moves out of a cycle checkbox
   */
  clearCycleHint(): void
  {
    document.getElementById('cycle_hint').setAttribute(
      'src',
      'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    );
  }


  /**
   * Look through the data object and create a summary including the number
   * of selected items and a comma-separated list of the selected items.
   *
   * @param data An object from which to create a summary
   */
  createSummary(data: object): string
  {
    /* init string and count variables */
    let summary = '';
    let count = 0;

    /* if no selections are made */
    if (data['options'] === undefined)
    {
      return '(0)';
    }

    /* build a string and count the number of options selected */
    for (let j = 0; j < data['options'].length; j++)
    {
      const item = data['options'][j];

      if (item['selected'] === true)
      {
        count++;
        if (count > 1)
        {
          summary += ', ';
        }
        summary += item['name'];
      }
    }
    return '(' + count + ') ' + summary;
  }


  /**
   * Show a modal dialog with the available options
   */
  showOptionDialog(option: string, selectMultiple: boolean): void
  {
    let data;

    switch (option)
    {
      case 'norm':
        data = this.norm;
        break;
      case 'center':
        data = this.centers;
        break;
      case 'platform':
        data = this.platforms;
        let center = 'EMC';
        for (let i = 0; i < this.centers.options.length; i++)
        {
          if (this.centers.options[i].selected === true)
          {
            center = this.centers.options[i].name;
            break;
          }
        }
        this.platforms['options'] = this.platforms[center];
        break;
    }

    if (data === undefined)
    {
      console.log('Invalid option set: ' + option);
      return;
    }

    const dialogRef = this.dialog.open(OptionsComponent, {
      width: '600px',
      height: '800px',
      data: {'title': option + 's', 'list': data}
    });

    dialogRef.afterClosed().subscribe(result =>
      {
        this.updateSummaries();
        this.validateRequest();
      }
    );
  }


  /**
   * Validate the request based on current selections
   */
  validateRequest(): void
  {
    this.errorMessages = [];

    /* validate the dates */
    if (this.startDate === undefined || this.endDate === undefined)
    {
      this.errorMessages[this.errorMessages.length] = 'start and end dates are required';
    } else if (this.startDate.getTime() > this.endDate.getTime())
    {
      this.errorMessages[this.errorMessages.length] = 'end date must not be earlier than start date';
    }

    /* validate the cycles */
    if (!this.c00z && !this.c06z && !this.c12z && !this.c18z)
    {
      this.errorMessages[this.errorMessages.length] = 'at least one cycle must be selected';
    }

    /* validate the norms */
    let norms = 0;
    for (let i = 0; i < this.norm['options'].length; i++)
    {
      if (this.norm['options'][i]['selected'])
      {
        norms++;
      }
    }
    if (norms > 1)
    {
      this.errorMessages[this.errorMessages.length] = 'only one norm may be selected';
    } else if (norms === 0)
    {
      this.errorMessages[this.errorMessages.length] = 'at least one norm must be selected';
    }

    /* validate the centers */
    let centers = 0;
    for (let i = 0; i < this.centers['options'].length; i++)
    {
      if (this.centers['options'][i]['selected'])
      {
        centers++;
      }
    }
    if (centers === 0)
    {
      this.errorMessages[this.errorMessages.length] = 'at least one center must be selected';
    }

    /* validate the platforms */
    let platforms = 0;
    if (this.platforms['options'] !== undefined)
    {
      for (let i = 0; i < this.platforms['options'].length; i++)
      {
        if (this.platforms['options'][i]['selected'])
        {
          platforms++;
        }
      }
    }
    if (platforms === 0)
    {
      this.errorMessages[this.errorMessages.length] = 'one or more platforms must be selected';
    }

    this.invalidRequest = this.errorMessages.length > 0;
  }


  /**
   * Change the date
   *
   * @param event Details including target and value
   */
  changeDate(event): void
  {
    if (event['targetElement']['placeholder'] === 'Start Date')
    {
      this.startDate = event['value'];
    } else if (event['targetElement']['placeholder'] === 'End Date')
    {
      this.endDate = event['value'];
    } else
    {
      console.log('Date change event ignored.');
      console.log(event);
    }

    this.validateRequest();
  }


  /**
   * Send a request to the API
   */
  submitRequest(): void
  {
    /* show the progress bar and hide the button */
    this.progressBarMode = 'open';
    this.submitButtonMode = 'closed';

    /* Query string parameters */
    const startDate = ControlsComponent.dateToString(this.startDate);
    const endDate = ControlsComponent.dateToString(this.endDate);

    /* add centers */
    let centers = '';
    for (let i = 0; i < this.centers['options'].length; i++)
    {
      if (this.centers['options'][i]['selected'] === true)
      {
        centers += this.centers['options'][i]['name'] + ',';
      }
    }
    centers = centers.slice(0, -1);

    /* add norms */
    let norm = '';
    for (let i = 0; i < this.norm['options'].length; i++)
    {
      if (this.norm['options'][i]['selected'] === true)
      {
        norm += this.norm['options'][i]['name'] + ',';
      }
    }
    norm = norm.slice(0, -1);

    /* add platforms */
    let platforms = '';
    for (let i = 0; i < this.platforms['options'].length; i++)
    {
      if (this.platforms['options'][i]['selected'] === true)
      {
        platforms += this.platforms['options'][i]['name'] + ',';
      }
    }
    platforms = platforms.slice(0, -1);

    /* add the cycles */
    let cycles = '';
    if (this.c00z)
    {
      cycles += '0,';
    }
    if (this.c06z)
    {
      cycles += '6,';
    }
    if (this.c12z)
    {
      cycles += '12,';
    }
    if (this.c18z)
    {
      cycles += '18,';
    }
    cycles = cycles.slice(0, -1);

    /* construct the request */
    this.requestData = {
      'start_date': startDate,
      'end_date': endDate,
      'centers': centers,
      'norm': norm,
      'platforms': platforms,
      'cycles': cycles,
      'interval': 24
    };

    /* add a request to our session list */
    this.sessionRequests[this.sessionRequests.length] = {
      'progressMode': 'indeterminate',
      'progress': 0,
      'requestData': this.requestData
    };

    /* send the request over the websocket */
    this.sendMessage(JSON.stringify(this.requestData));
  }


  /**
   * Get a websocket connection -- create one if it does not already exist
   */
  getWebSocketConnection(): WebSocket
  {
    if (this.websocket === undefined)
    {
      /* create a new websocket */
      this.websocket = new WebSocket(this.websocketUrl);

      /* add listeners for the new websocket */
      this.websocket.onopen = function() { console.log('Websocket connection opened.'); };
      this.websocket.onclose = function() { this.websocket = undefined; console.log('Websocket connection closed.'); }.bind(this);
      this.websocket.onmessage = this.receiveMessage.bind(this);

      return this.websocket;
    }

    /* return the websocket */
    return this.websocket;
  }


  /**
   * Send a message to the server via the websocket
   *
   * @param data The data to send
   */
  sendMessage(data: string): void
  {
    const ws = this.getWebSocketConnection();

    /* make sure the websocket is ready */
    if (ws.readyState !== 1)
    {
      setTimeout(this.sendMessage.bind(this), 200, [data]);
      return;
    }

    /* send data on the websocket */
    ws.send(JSON.stringify(this.requestData));
    console.log('Websocket request sent: ');
    console.log(this.requestData);
  }


  /**
   * Handle an incoming message from the server
   */
  receiveMessage(event): void
  {
    console.log(event);

    const data = JSON.parse(event.data);

    /* if response contains 'images' attribute, show images and remove progress bar */
    if (data.images !== undefined)
    {
      this.display.setImages(data.images);
      this.progressBarMode = 'closed';
      this.submitButtonMode = 'open';
    }

    /* if response contains 'errors' attribute, show errors */
    if (data.errors !== undefined)
    {
      this.errorMessages = data.errors;
      this.progressBarMode = 'closed';
      this.submitButtonMode = 'open';
    }
    // TODO:
    /* if response contains 'status_id' attribute, update status */
  }


  /**
   * Called by the Angular Router when query string parameters in the URL change
   *
   * @param params A list of query string parameters in the URL
   */
  queryParamsChanged(params): void
  {
    // TODO:
    /* send a request for cached images using the params['cache_id'] value */
  }
}
