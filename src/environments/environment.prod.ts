export const environment = {
  production: true,
  loggingLevel: 'OFF',
  CaseEditorConfig: {
    api_url: '/aggregated',
    case_data_url: '/data',
    document_management_url: '/documents',
    login_url: '/login',
    oauth2_client_id: 'ccd_gateway',
    postcode_lookup_url: '/addresses?postcode=${postcode}',
    remote_document_management_url: '/documents',
    payments_url: '/payments',
    activity_batch_collection_delay_ms: 1,
    activity_next_poll_request_ms: 5000,
    activity_retry: 5,
    activity_url: '',
    activity_max_request_per_batch: 25,
    print_service_url: '/print',
    remote_print_service_url: '/remote_print'
  }
};
