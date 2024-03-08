/* global CMS, createClass, window */

import slugify from '@sindresorhus/slugify';

const successCriteria = window.successCriteria;

CMS.registerPreviewStyle('/assets/styles/cms.css');
CMS.registerPreviewStyle('/assets/styles/main.css');
CMS.registerPreviewStyle('/assets/styles/report.css');

const IssuePreview = createClass({
	render() {
		const entry = this.props.entry;
		return (
			<article className='issue'>
				<h3 data-issue='Issue' className='issue-title'>
					{entry.getIn(['data', 'title'])}
				</h3>
				{this.props.widgetFor('body')}
				<div className='issue-meta'>
					<dl>
						<div>
							<dt>WCAG Criteria: </dt>
							<dd>{entry.getIn(['data', 'sc']).map(sc => (
								<a class='wcag-link' href={`https://www.w3.org/WAI/WCAG22/quickref/#${successCriteria[sc].id}`} rel='external'>
									{sc} <span class='external'>(external link)</span>
									<svg aria-hidden='true' role='presentation' focusable='false' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' height='14' width='16'><path xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' d='M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4L21 10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10L19 6.41422L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L17.5858 5H14ZM3 7C3 5.89543 3.89543 5 5 5H10C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7H5V19H17V14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7Z' fill='currentColor'></path></svg>
								</a>
							))}</dd>
						</div>
						{entry.getIn(['data', 'severity']) === 'High' ? (
							<div>
								<dt>Severity: </dt>
								<dd>{entry.getIn(['data', 'severity'])}</dd>
							</div>
						) : (
							''
						)}
						<div>
							<dt>Sample: </dt>
							<dd>{entry.getIn(['data', 'sample']) === 'all'
								? 'All pages' : (
									<a href={`/#${slugify(entry.getIn(['data', 'sample']))}`}>{entry.getIn(['data', 'sample'])}</a>
								)}</dd>
						</div>
					</dl>
				</div>
			</article>
		);
	},
});

CMS.registerPreviewTemplate('issue', IssuePreview);

const ReportPreview = createClass({
	render() {
		const entry = this.props.entry;
		return (
			<>
				<section id='start'>
					<h1>Accessibility Conformance Report for {entry.getIn(['data', 'title'])}</h1>
					<dl>
						<dt>Evaluated by</dt>
						<dd>{entry.getIn(['data', 'evaluators']).join(', ')}</dd>
						<dt>Commissioned by</dt>
						<dd>{entry.getIn(['data', 'commissioner'])}</dd>
						<dt>Target</dt>
						<dd>WCAG {entry.getIn(['data', 'targetWcagVersion'])}, Level {entry.getIn(['data', 'targetLevel'])}</dd>
						<dt>Date</dt>
						<dd>{new Intl.DateTimeFormat('en-CA', {dateStyle: 'long'}).format(entry.getIn(['data', 'date']))}</dd>
						<dt>Special requirements</dt>
						<dd>{entry.getIn(['data', 'specialRequirements'])}</dd>
					</dl>
				</section>
				<section id='executive-summary'>
					<h2>Executive summary</h2>
					{this.props.widgetFor('body')}
				</section>
				<section id='scope'>
					<h2>Scope</h2>
					<h3>Pages</h3>
					<p>Scope:</p>
					<ul>
						{this.props.widgetsFor('scope').map((scope, index) => (
							<li key={index}>
								<a href={scope.getIn(['data', 'url'])} rel='external'>
									{scope.getIn(['data', 'title'])} <span class='external'>(external link)</span>
									<svg aria-hidden='true' role='presentation' focusable='false' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' height='14' width='16'><path xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' d='M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4L21 10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10L19 6.41422L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L17.5858 5H14ZM3 7C3 5.89543 3.89543 5 5 5H10C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7H5V19H17V14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7Z' fill='currentColor'></path></svg>
								</a>{scope.getIn(['data', 'description']) ? (
									<p>{scope.getIn(['data', 'description'])}</p>
								) : ''}
							</li>
						))}
					</ul>
					<p>Not in scope:</p>
					<ul>
						{this.props.widgetsFor('outOfScope').map((outOfScope, index) => (
							<li key={index}>
								<a href={outOfScope.getIn(['data', 'url'])} rel='external'>
									{outOfScope.getIn(['data', 'title'])} <span class='external'>(external link)</span>
									<svg aria-hidden='true' role='presentation' focusable='false' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' height='14' width='16'><path xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd' d='M14 5C13.4477 5 13 4.55228 13 4C13 3.44772 13.4477 3 14 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4L21 10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10L19 6.41422L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L17.5858 5H14ZM3 7C3 5.89543 3.89543 5 5 5H10C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7H5V19H17V14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V19C19 20.1046 18.1046 21 17 21H5C3.89543 21 3 20.1046 3 19V7Z' fill='currentColor'></path></svg>
								</a>{outOfScope.getIn(['data', 'description']) ? (
									<p>{outOfScope.getIn(['data', 'description'])}</p>
								) : ''}
							</li>
						))}
					</ul>
					<h3>Tools used</h3>
					<p>In conducting this audit, the following tools were used:</p>
					<ul>
						{this.props.widgetsFor('tools').map((tool, index) => (
							<li key={index}>{tool.getIn(['data', 'name'])}{tool.getIn(['data', 'version']) ? ` ${tool.getIn(['data', 'version'])}` : ''}</li>
						))}
					</ul>
					<h3>Technologies used</h3>
					<p>The audited web page relies on the following technologies:</p>
					<ul>
						{entry.getIn(['data', 'technologies']).map((technology, index) => (
							<li key={index}>{technology}</li>
						))}
					</ul>
				</section>
			</>
		);
	},
});

CMS.registerPreviewTemplate('report', ReportPreview);
