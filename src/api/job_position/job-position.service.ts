import { HttpService } from 'nestjs-http-promise';
import { Injectable } from '@nestjs/common';
import { SearchJobPositionDto } from './job-position.dto';

@Injectable()
export class JobPositionService {
  constructor(private readonly httpService: HttpService) {}

  apiUrl = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';

  public async jobList(queryParams: SearchJobPositionDto): Promise<any> {
    const apiResponse = await this.httpService.get(this.apiUrl);

    if (apiResponse.status !== 200) return null;

    let responseData = apiResponse.data;
    if (
      'description' in queryParams ||
      'location' in queryParams ||
      'fulltime' in queryParams
    ) {
      responseData = responseData.filter((item: any) => {
        if (
          'description' in queryParams &&
          !('location' in queryParams) &&
          !('fulltime' in queryParams)
        ) {
          return item.description
            .toLowerCase()
            .includes(queryParams.description.toLowerCase());
        } else if (
          'description' in queryParams &&
          'location' in queryParams &&
          !('fulltime' in queryParams)
        ) {
          return (
            item.description.includes(queryParams.description) ||
            item.location
              .toLowerCase()
              .includes(queryParams.location.toLowerCase())
          );
        } else if (
          'description' in queryParams &&
          'location' in queryParams &&
          'fulltime' in queryParams
        ) {
          const filter =
            item.description.includes(queryParams.description) ||
            item.location
              .toLowerCase()
              .includes(queryParams.location.toLowerCase());
          if (queryParams.fulltime.toLowerCase() === 'true') {
            return filter && item.type.toLowerCase() === 'full time';
          }
          return filter;
        } else if (
          !('description' in queryParams) &&
          'location' in queryParams &&
          !('fulltime' in queryParams)
        ) {
          return item.location
            .toLowerCase()
            .includes(queryParams.location.toLowerCase());
        } else if (
          !('description' in queryParams) &&
          'location' in queryParams &&
          'fulltime' in queryParams &&
          queryParams.fulltime.toLowerCase() === 'true'
        ) {
          const filter = item.location
            .toLowerCase()
            .includes(queryParams.location.toLowerCase());

          if (queryParams.fulltime.toLowerCase() === 'true') {
            return filter && item.type.toLowerCase() === 'full time';
          }
          return filter;
        } else if (
          !('description' in queryParams) &&
          !('location' in queryParams) &&
          'fulltime' in queryParams
        ) {
          if (queryParams.fulltime.toLowerCase() === 'true') {
            return item.type.toLowerCase() === 'full time';
          } else {
            return item.type.toLowerCase() !== 'full time';
          }
        }
      });
    }

    if (responseData.length === 0) {
      return null;
    }

    return responseData;
  }

  public async jobDetail(id: string): Promise<any> {
    const apiResponse = await this.httpService.get(this.apiUrl);

    if (apiResponse.status !== 200) return null;

    const filterData = apiResponse.data.filter((item: any) => item.id === id);
    return filterData[0];
  }
}
